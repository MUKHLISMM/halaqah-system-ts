import {
  Input,
  Box,
  Button,
  Grid,
  Heading,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, notification } from "antd";
import NavLink from "../component/NavLink";
import { primaryColor } from "../theme";
import MyButton from "../component/MyButton";
import { RulePassword } from "../constants/RulePassword";
import { getSession, signIn } from "next-auth/react";

export default function Login(props: any) {

  const [show, setShow] = React.useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const onFinish = async (values: any) => {
    console.log(props.query.callbackUrl);
    
    console.log("Success:", values);
    let res = await signIn("credentials", {
      ...values,
      callbackUrl: props.query.callbackUrl,
      redirect: false,
    });

    console.log(res);
    if(res?.ok){
      window.location.href=res?.url||""
    }
    if (res?.error) {
      if (res.status === 401) {
        notification["error"]({
          message: "Notification Error",
          description: "Email or password is wrong."
        });
      } else {
        notification["error"]({
          message: "Notification Error",
          description: res.error,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  ///
  return (
    <Grid
      bg={"#F3F4F6"}
      w="100%"
      minH="100vh"
      display="grid"
      justifyItems={"center"}
      alignContent="center"
    >
      <Box
        display={"grid"}
        w="66%"
        minW={"350px"}
        gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow={"2xl"}
      >
        <Box h={"full"} display="inline-block" bg="white" p={5}>
          <Heading size={"sm"}>
            <Box as="span" color={primaryColor}>
              HALAQAH
            </Box>
            System
          </Heading>
          <Heading
            fontSize={"2xl"}
            color={primaryColor}
            textAlign={"center"}
            my={5}
          >
            Sign in to Account
          </Heading>
          <Box display="grid" justifyContent="center" my={5}>
            <Box
              border={`2px solid ${primaryColor}`}
              display="inline-block"
              w="20"
              h="0.5"
            ></Box>
          </Box>
          <Box px={9}>
            <Form
              name="basic"
              // labelCol={{
              //   span: 0,
              // }}
              // wrapperCol={{
              //   span: 24,
              // }}
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                // label="Username"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Email is not a valid email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                // label="Password"
                name="password"
                rules={RulePassword}
              >
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Form.Item>

              {/* <Form.Item name="remember" valuePropName="checked">
                <Checkbox colorScheme={"green"}>Remember me</Checkbox>
              </Form.Item> */}

              <Box textAlign={"center"}>
                <MyButton>Sign in</MyButton>
              </Box>
            </Form>
          </Box>
        </Box>
        <Box
          h={"full"}
          display={["none", "none", "inline-block"]}
          px={5}
          py={20}
          bg={primaryColor}
          textAlign="center"
        >
          <Heading color="white" fontSize={"2xl"} textAlign={"center"} my={5}>
            Register!!
          </Heading>
          <Text color="white" fontSize={"14"} textAlign={"center"} my={5}>
            Fill up personal information and start activity (STUDENT ONLY)
          </Text>
          <Box textAlign={"center"}>
            <NavLink href="/Register">
              <Button
                type="button"
                size="md"
                height="48px"
                width="150px"
                border="2px"
                borderRadius="3xl"
                borderColor={"white"}
                _hover={{
                  background: "white",
                  color: primaryColor,
                }}
                bg={"transparent"}
                color={"white"}
              >
                Sign up
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export async function getServerSideProps(context: any) {
  let query = context.query
  let session = await getSession(context)

  if (query) {
    if (query.callbackUrl) {
      // if (query.callbackUrl.startsWith(process.env.NEXTAUTH_URL)) {
      //   query = { ...query, callbackUrl: process.env.NEXTAUTH_URL }
      // }
      // Allows relative callback URLs
      // else 
      if (query.callbackUrl.startsWith("/")) {
        query = { ...query, callbackUrl: "http://localhost:3000" + '' + query.callbackUrl }
        //new URL(url, baseUrl).toString()
      }
      // else{
      //   query.callbackUrl.toString().replace(/process.env.NEXTAUTH_URL/g)
      // } 
    } else {
      query = { ...query, callbackUrl: "http://localhost:3000" }
    }
    if (session?.user) {
      return {
        redirect: {
          permanent: false,
          destination: query.callbackUrl,
        },
        props: {},
      };
    }
    return {
      props: {
        query,
        session
      }
    }
  } else {
    if (session?.user) {
      return {
        redirect: {
          permanent: false,
          destination: "http://localhost:3000"
        },
        props: {},
      };
    }
    return {
      props: {
        query: {
          callbackUrl: "http://localhost:3000"
        },
        session
      }
    }
  }
}
