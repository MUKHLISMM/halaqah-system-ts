import {
  Box,
  Flex,
  Heading,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Space, Drawer, notification, Popconfirm, Result } from "antd";
import React, { useState } from "react";
import AddButton from "../../component/AddButton";
import Tile from "../../component/Tile";
import Template from "../../template/Template";
import {  MdPersonAddAlt1 } from "react-icons/md";
import RegisterForm from "../../forms/RegisterForm";
import { fetchWithToken, myAxios } from "../../config/axios";
import CancelButton from "../../component/CancelButton";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Account } from "../../interface/account";
import SaveButton from "../../component/SaveButton";
import TableTeacherForm from "../../Table/TableTeacherForm";
import TableStudentForm from "../../Table/TableStudentForm";
import TableAdminFrom from "../../Table/TableAdminFrom";

export default function AccountList() {
  const { data: session }: any = useSession({ required: true });
  const { data: account } = useSWR<Account[]>(
    session?.user?.accessToken
      ? ["/accounts?roleId=2,3,4", session?.user?.accessToken]
      : null,
    fetchWithToken
  );
  // console.log(account);
  const [isShow, setIsShow] = useState();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const saveData = async (values: any) => {
    try {
      values = {
        ...values,
        birthDay: values.birthDay.format("YYYY-MM-DD"),
      };
      // console.log(values);
      let student = await myAxios.post("/teachers", values, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      console.log(student);
      if (student.status === 201) {
        notification["success"]({
          message: "ลงทะเบียนเรียบร้อย",
        });
        setShow(false);
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
  const updateData = async (values: any) => {
    try {
      values = {
        ...values,
        birthDay: values.birthDay.format("YYYY-MM-DD"),
      };
      console.log(values.studentId);
      let student = await myAxios.patch("/accounts/" + id, values, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      console.log(student);
      if (student.status === 200) {
        notification["success"]({
          message: "updated !!",
        });
        setShow(false);
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

  const onClose = () => {
    setId(null);
    setShow(false);
  };

  return (
    <Template>
      <Tile width= "100%">
        <Flex>
          <Heading size="md" fontSize="20px" pb={5}>
            user's
          </Heading>
          <Spacer />
          <AddButton
            onClick={() => {
              setId(null);
              setShow(true);
            }}
          >
            <MdPersonAddAlt1 size={20} />
          </AddButton>
          <Drawer
            title={
              <>
                <Box textAlign={"center"}>
                  <Heading pt={5} fontFamily="-moz-initial" fontSize={20}>
                    CREATE A NEW ACCOUNT.
                  </Heading>
                </Box>
              </>
            }
            width={"large"}
            onClose={onClose}
            visible={show}
            bodyStyle={{ paddingBottom: 80 }}
            // zIndex={2000}
          >
            <RegisterForm
              onSaveData={id ? updateData : saveData}
              roleId={
                id
                  ? account?.find((item: Account) => item.id === id)?.roleId ||
                    3
                  : 3
              }
              id={id}
              saveButton={
                <Space>
                  <SaveButton>Save</SaveButton>
                  <Popconfirm title={"are your sure!"} onConfirm={onClose}>
                    <CancelButton>Back</CancelButton>
                  </Popconfirm>
                </Space>
              }
            />
          </Drawer>
        </Flex>

        <Tabs colorScheme='green' variant="enclosed">
          <TabList>
            <Tab fontFamily={"-moz-initial"}>Faculty-Admin</Tab>
            <Tab fontFamily={"-moz-initial"}>Teacher</Tab>
            <Tab fontFamily={"-moz-initial"}>Student</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableAdminFrom />
            </TabPanel>
            <TabPanel>
              <TableTeacherForm roleId={3}/>
            </TabPanel>
            <TabPanel>
              <TableStudentForm  roleId={4}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Tile>
    </Template>
  );
}
