import React from 'react'
import { useState } from "react";
import {  Box, Heading } from "@chakra-ui/react";
import {  Modal, notification, Popconfirm, Space } from "antd";
import Table, { ColumnsType, TableProps } from "antd/lib/table";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Account } from "../interface/account";
import { getRole } from "../function";
import DeleteButton from "../component/DeleteIcon";
import { fetchWithToken, myAxios } from "../config/axios";
import UpdateIcon from "../component/UpdateIcon";
import CancelButton from "../component/CancelButton";
import UpadateButton from "../component/UpdateButton";
import RegisterForm from "../forms/RegisterForm";

export default function TableAdminFrom() {
    const { data: session }: any = useSession({ required: true });
    const { data: account } = useSWR<Account[]>(
      session?.user?.accessToken
        ? ["/accounts?roleId=1,2", session?.user?.accessToken]
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
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const onClose = () => {
      setId(null);
      setShow(false);
    };
  
    const columns: ColumnsType<any> = [
      {
        title: "No.",
        render: (value, record, index) => {
          return index + 1;
        },
      },
      {
        title: "UserName",
        dataIndex: "userName",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
      },
      {
        title: "Action",
        key: "x",
        width: "10%",
        render: (value, record, index) => (
          <Space size={3}>
            <UpdateIcon
              type="button"
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
    <>
    <Table
      columns={columns}
      dataSource={account?.map((item: Account, i: number) => ({
        ...item,
        key: i + 1,
        identificationId: item.roleId === 1||2 ? item.roleId: item.roleId,
        role: getRole(item.roleId),
      }))}
      onChange={onChange}
      bordered
      size="small"
    />
    <Modal
      title={
        <>
          {" "}
          <img src="/wide-logo.png" width={130} />
          <Box textAlign={"center"}>
            <Heading pt={5} fontFamily="-moz-initial" fontSize={20}>
              UPDATE THE ACCOUNT.
            </Heading>
          </Box>
        </>
      }
      centered
      visible={show}
      onOk={() => setShow(false)}
      onCancel={() => setShow(false)}
      width={800}
      style={{
        padding: 20,
        // border-radius: 25
      }}
      footer={[]}
    >
      <RegisterForm
        onSaveData={id ? updateData : saveData}
        roleId={
          id
            ? account?.find((item: Account) => item.id === id)?.roleId || 3
            : 3
        }
        id={id}
        saveButton={
          <Box pt={7}>
            <Space>
              <UpadateButton>UPDATE</UpadateButton>
              <Popconfirm title={"are your sure!"} onConfirm={onClose}>
                <CancelButton>
                  <Space>BACK</Space>
                </CancelButton>
              </Popconfirm>
            </Space>
          </Box>
        }
      />
    </Modal>
  </>
  )
}
