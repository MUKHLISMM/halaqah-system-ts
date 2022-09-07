import { Box, Divider, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { Space, Table, Drawer, notification, Popconfirm } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import React, { useState } from "react";
import AddButton from "../../component/AddButton";
import Tile from "../../component/Tile";
import Template from "../../template/Template";
import { MdDeleteOutline, MdPersonAddAlt1 } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import RegisterForm from "../../forms/RegisterForm";
import { fetchWithToken, myAxios } from "../../config/axios";
import CancelButton from "../../component/CancelButton";
import MyButton from "../../component/MyButton";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { getRole } from "../../function";
import { Account } from "../../interface/account";
import UpdateIcon from "../../component/UpdateIcon";
import DeleteButton from "../../component/DeleteIcon";

export default function All() {
  const { data: session }: any = useSession({ required: true });
  const { data: account } = useSWR<Account[]>(
    session?.user?.accessToken
      ? ["/accounts?roleId=2,3,4", session?.user?.accessToken]
      : null,
    fetchWithToken
  );
  // console.log(account);
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
      let student = await myAxios.patch("/accounts/"+id, values, {
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

  const columns: ColumnsType<any> = [
    {
      title: "ลำดับ",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: "UserName",
      dataIndex: "userName",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "TeacherAdmin", value: "TeacherAdmin" },
        { text: "Teacher", value: "Teacher" },
        { text: "Student", value: "Student" },
      ],
      onFilter: (value: any, record) => {
        return record.role.indexOf(value) === 0;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Identification ID",
      dataIndex: "identificationId",
      render: (text) => <Box>{text}</Box>,
    },
    {
      title: "Action",
      key: "x",
      width: "10%",
      render: (value, record, index) => (
        <Space size={3}>
          <UpdateIcon
            onClick={() => {
              setId(value.id);
              setShow(true);
            }}
          >
            <TbEdit size={18} />
          </UpdateIcon>
          <DeleteButton>
            <MdDeleteOutline size={18} />
          </DeleteButton>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Template>
      <HStack>
        <Tile>
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
              title="Create a new account"
              width={"large"}
              onClose={onClose}
              visible={show}
              bodyStyle={{ paddingBottom: 80 }}
              // zIndex={2000}
            >
              <RegisterForm
                onSaveData={id? updateData:saveData}
                roleId={id ? account?.find((item:Account)=>(item.id===id))?.roleId||3 : 3}
                id={id}
                saveButton={
                  <Space>
                    {id?(<MyButton colorScheme="yellow">update</MyButton>):(<MyButton>Save</MyButton>)}
                    <Popconfirm title={"are your sure!"} onConfirm={onClose}>
                      <CancelButton>Cancel</CancelButton>
                    </Popconfirm>
                  </Space>
                }
              />
            </Drawer>
          </Flex>
          <Divider />
          <Table
            columns={columns}
            dataSource={account?.map((item: Account, i: number) => ({
              ...item,
              key: i + 1,
              identificationId:
                item.roleId === 4 ? item.studentId : item.teacherId,
              role: getRole(item.roleId),
            }))}
            onChange={onChange}
            bordered
            size="small"
          />
        </Tile>
      </HStack>
    </Template>
  );
}
