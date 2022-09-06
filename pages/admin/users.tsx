import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Space, Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import Tile from "../../component/Tile";
import Template from "../../template/Template";
import { FaEdit, FaInfo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Users() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  interface DataType {
    key: React.Key;
    identificationId: any;
    name: string;
    faculty: string;
    major: string;
    phone: any;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Identification ID",
      dataIndex: "identificationId",
      render: (text) => <Box>{text}</Box>,
    },
    {
      title: "UserName",
      dataIndex: "name",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      filters: [
        { text: "Islamic Studies and Law", value: "Islamic Studies and Law" },
        {
          text: "Liberal Arts and Social Science",
          value: "Liberal Arts and Social Science",
        },
        { text: "Science and Tecnology", value: "Science and Tecnology" },
        { text: "Education", value: "Education" },
        {
          text: "International Language Academy",
          value: "International Language Academy",
        },
      ],
      onFilter: (value: any, record) => {
        return record.faculty.indexOf(value) === 0;
      },
    },
    {
      title: "Major",
      dataIndex: "major",
      filters: [
        { text: "Islamic Studies and Law", value: "Islamic Studies and Law" },
        {
          text: "Liberal Arts and Social Science",
          value: "Liberal Arts and Social Science",
        },
        { text: "Science and Tecnology", value: "Science and Tecnology" },
        { text: "Education", value: "Education" },
        {
          text: "International Language Academy",
          value: "International Language Academy",
        },
      ],
      onFilter: (value: any, record) => {
        return record.major.indexOf(value) === 0;
      },
    },
    {
      title: "PhoneNumber",
      width: "10%",
      dataIndex: "phone",
    },
    
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "5%",
      render: () => (
        <Space size={7}>
     <FaInfo size={25} type="button" onClick={onOpen}/>
     <FaEdit size={25} type="button"/>
     <MdDelete size={25} type="button"/>
     
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      identificationId: "601431003",
      name: "Mukhlis Meeraya",
      faculty: "Science and Tecnology",
      major: "Education",
      phone: "0612180470",
    },
    {
      key: "2",
      identificationId: "601431014",
      name: "Hassan Samae",
      faculty: "Science and Tecnology",
      major: "Education",
      phone: "06512307645",
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Template>
      <HStack>
        <Tile>
          <Flex>
            <Heading size="md" fontSize="20px" pb={5}>
              User's Profile
            </Heading>
            <Spacer />
          </Flex>
          <Divider />
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            bordered
            size="small"
          />{" "}
        </Tile>
      </HStack>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <text>ข้อมูลนักศึกษา หรืออาจารย์</text>
          </ModalBody>
          <ModalFooter>
            {/* <MoreButton onClick={onClose}>Close</MoreButton> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Template>
  );
}
