import {
  Box,
  Checkbox,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, DatePicker, notification, Select, Switch, Divider } from "antd";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import SaveButton from "../component/SaveButton";
import { fetcher, fetchWithToken } from "../config/axios";
import { RulePassword } from "../constants/RulePassword";
import { Account } from "../interface/account";
import { Faculty } from "../interface/faculty";
import { Major } from "../interface/major";
interface Props {
  roleId: number;
  onSaveData: any;
  id?: number | null;
  saveButton?: any;
}
export default function RegisterForm(props: Props) {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const { data: session }: any = useSession();
  const [form] = Form.useForm();
  const { roleId, onSaveData, saveButton, id = null } = props;
  const [show, setShow] = React.useState<boolean>(false);
  const [facultyId, setFacultyId] = React.useState<any>(null);
  const { data: faculties } = useSWR("/faculties", fetcher);
  const { data: account, mutate } = useSWR<Account>(
    session?.user?.accessToken && id
      ? ["/accounts/" + id, session?.user?.accessToken]
      : null,
    fetchWithToken
  );
  const { data: majors } = useSWR("/majors", fetcher);
  const handleClick = () => setShow(!show);
  const onFinish = async (value: any) => {
    await onSaveData(value);
    mutate();
  };
  useEffect(() => {
    if (account) {
      if (roleId === 4) {
        setFacultyId(account.student?.facultyId);
        form.setFieldsValue({
          ...account.student,
          ...account,
          studentId: account?.studentId?.toString(),
          birthDay: moment(account.student?.birthDay),
          confirmPassword: account.password,
        });
      } else if (roleId === 2 || roleId === 3) {
        setFacultyId(account.teacher?.facultyId);
        form.setFieldsValue({
          ...account.teacher,
          ...account,
          teacherId: account?.teacherId?.toString(),
          birthDay: moment(account.teacher?.birthDay),
          confirmPassword: account.password,
        });
      }
    } else {
      form.resetFields();
    }

    return () => {};
  }, [id, roleId, form, account]);

  console.log(account);

  return (
    <>
      <Box textAlign={"center"} color="#757573">
        <p>
          Please!! check your infomation berfore sending or save Data for order
          not to waste time in edited.
        </p>
      </Box>
      <Divider style={{ borderColor: "#d8d8d8" }}>Profile Info</Divider>

      <Form
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Box
          display="grid"
          px={10}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          columnGap={30}
          rowGap={5}
        >
          <Form.Item
            name="firstName"
            label={<Text mb="8px">First Name:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={<Text mb="8px">Last Name:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Box>
        <Box px={10} pt={0} pb={20} height="10">
          <Form.Item
            name="address"
            label={<Text mb="8px">Address:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Textarea size="sm" />
          </Form.Item>
        </Box>
        <Box
          pt={50}
          display="grid"
          px={10}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          columnGap={30}
        >
          {roleId === 4 ? (
            <Form.Item
              // label="Username"
              name="studentId"
              label={<Text mb="8px">Student ID:</Text>}
              rules={[
                {
                  required: true,
                  message: "Please input your studentId!",
                },
                {
                  pattern: /^([1-9]\d+)$/,
                  message: "Please! input number 0-9 ",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              // label="Username"
              name="teacherId"
              label={<Text mb="8px">Teacher ID:</Text>}
              rules={[
                {
                  required: true,
                  message: "Please input your teacherId!",
                },
                {
                  pattern: /^([1-9]\d+)$/,
                  message: "Please! input number 0-9 ",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="birthDay"
            label={<Text mb="8px">birthDay:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="facultyId"
            label={<Text mb="8px">Faculty:</Text>}
            rules={[
              {
                required: true,
                message: "Please select your faculty!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select faculty"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onChange={(v) => {
                setFacultyId(v);
              }}
            >
              {faculties?.map((item: Faculty) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="majorId"
            label={<Text mb="8px">Major:</Text>}
            rules={[
              {
                required: true,
                message: "Please select Major!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select major"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {/* <Select.Option value={1}>it</Select.Option> */}
              {majors
                ?.filter(
                  (item: Major) => facultyId && item.facultyId === facultyId
                )
                ?.map((item1: Major) => (
                  <Select.Option key={item1.id} value={item1.id}>
                    {item1.shortName + " | " + item1.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Box>
        {roleId !== 4 && (
          <Box px={10} display="1">
            {/* <Form.Item
              name="roleId"
              label={<Text mb="8px">Role:</Text>}
              rules={[
                {
                  required: true,
                  message: "Please select your role!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Role"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Select.Option value={3} disabled={componentDisabled}>Murabbee</Select.Option>
              </Select>
            // </Form.Item> */}
             <Form.Item
              name="role"
              label={<Text mb="8px">Role:</Text>}
            >
              <Input placeholder="Murabbee" value={3} disabled={componentDisabled}/>
            </Form.Item>
            <Form.Item
              name="position"
              label={<Text mb="8px">Position:</Text>}
              rules={[
                {
                  required: true,
                  message: "Please input your position!",
                },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Box>
        )}
        <Divider style={{ borderColor: "#d8d8d8" }}>Contact</Divider>

        <Box
          display="grid"
          px={10}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          columnGap={30}
        >
          <Form.Item
            name="phoneNumber"
            label={<Text mb="8px">Phone:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
          <Input type="tel" placeholder="" />
          </Form.Item>

          <Form.Item
            name="lineAccount"
            label={<Text mb="8px">LineAccount:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your lineAccount!",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Box>
        <Box px={10}>
          <Form.Item
            name="aacebookAccount"
            label={<Text mb="8px">FacebookAccount:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your FacebookAccount!",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Box>

        <Divider style={{ borderColor: "#d8d8d8" }}>Account</Divider>
        <Box px={10}>
          <Form.Item
            name="email"
            label={<Text mb="8px">Email:</Text>}
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "Email is not a valid email",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Box>
        <Box
          display="grid"
          px={10}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          columnGap={30}
          rowGap={5}
        >
          <Form.Item
            // label="Password"
            name="password"
            label={<Text mb="8px">Password:</Text>}
            rules={RulePassword}
          >
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder=""
            />
          </Form.Item>

          <Form.Item
            // label="Passwor
            name="confirmPassword"
            label={<Text mb="8px">Confirm Password:</Text>}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder=""
            />
          </Form.Item>
        </Box>
        <Box px={10}>
          <Checkbox
            colorScheme="green"
            isChecked={show}
            onChange={(v) => setShow(!show)}
          >
            Show password
          </Checkbox>
        </Box>

        <Box textAlign={"center"}  py={10}>
          {saveButton ? saveButton : <SaveButton>Register</SaveButton>}
        </Box>
      </Form>
    </>
  );
}
