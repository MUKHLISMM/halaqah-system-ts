import {
  Box,
  Grid,
  Img,
} from "@chakra-ui/react";
import React from "react";
import { notification} from "antd";
import {  myAxios } from "../config/axios";
import { useRouter } from "next/router";
import RegisterForm from "../forms/RegisterForm";
import MyButton from "../component/MyButton";

export default function Register() {
  const [show, setShow] = React.useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      values = {
        ...values,
        birthDay: values.birthDay.format("YYYY-MM-DD"),
      };
      // console.log(values);
      let student = await myAxios.post("/students", values);
      console.log(student);
      if (student.status === 201) {
        notification["success"]({
          message: "ลงทะเบียนเรียบร้อย",
        });

        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message) {
        notification["error"]({
          message: "Notification Error",
          description: error.response?.data?.message,
        });
      } else {
        notification["error"]({
          message: "Notification Error",
          description: error.message,
        });
      }
    }
  };
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
        borderRadius="2xl"
        overflow="hidden"
        boxShadow={"2xl"}
        my={5}
      >
        <Box h={"full"} display="inline-block" bg="white" p={5}>
          <Box pb={7} h="auto" placeItems={"end"}>
            <Img w={"3xs"} src="/wide-logo.png" alt="" className=" h-auto " />
          </Box>
          <RegisterForm onSaveData={onFinish} roleId={4} saveButton={<MyButton type="submit">Sign Up</MyButton>} />
        </Box>
      </Box>
    </Grid>
  );
}
