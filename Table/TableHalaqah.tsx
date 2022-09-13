import {
  Box,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Modal } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import MoreButton from "../component/MoreButton";

interface DataType {
  key: string;
  activityId: string;
  date: string;
  category: string;
  topic: string;
  pin: number;
}

export default function TableHalaqah() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const columns: ColumnsType<DataType> = [
    {
      title: "ActivityID",
      dataIndex: "activityId",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Topic",
      dataIndex: "topic",
    },
    {
      title: "Activity PIN",
      dataIndex: "pin",
      render: (text) => <Box>{text}</Box>,
    },
    {
      title: "Action",
      key: "x",
      width: "10%",
      render: (value, record, index) => (
        <MoreButton
          type="button"
          onClick={() => {
            setId(value.id);
            setShow(true);
          }}
        >
          Info more
        </MoreButton>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      activityId: "1001",
      date: "20/11/65",
      category: "default",
      topic: "testing",
      pin: 12345,
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title={
          <>
            {" "}
            <img src="/wide-logo.png" width={130} />
          </>
        }
        centered
        visible={show}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
        width={800}
        style={{
          padding: 10,
          // border-radius: 25
        }}
        footer={[]}
      >
        <Tabs variant="enclosed" colorScheme={"green"}>
          <TabList>
            <Tab fontFamily={"-moz-initial"}>Infomation</Tab>
            <Tab fontFamily={"-moz-initial"}>Member</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>{/* <TabTeacherForm /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Modal>
    </>
  );
}
