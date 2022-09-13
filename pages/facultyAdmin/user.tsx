import React from 'react'
import {
    Box,
    Flex,
    Heading,
    HStack,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
  } from "@chakra-ui/react";
  import {  Space } from "antd";
  import { useState } from "react";
  import { HiOutlineViewGridAdd } from "react-icons/hi";
  import { TbBooks } from "react-icons/tb";
  import AddButton from "../../component/AddButton";
  import Tile from "../../component/Tile";
  import TableHalaqah from "../../Table/TableHalaqah";
  import Template from "../../template/Template";
  import { primaryColor } from "../../theme";
import TabStudentForm from '../../Table/TableStudentForm';
import { useSession } from 'next-auth/react';
  

export default function user() {
  const { data: session }: any = useSession({ required: true });
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
  
    const onClose = () => {
      setId(null);
      setShow(false);
    };
  console.log(session);
  
  return (
    <Template>
      <HStack>
        <Tile>
          <Heading size="md" fontSize="20px" pb={5} color="blackAlpha.800">
            Halaqah Al-Quran
          </Heading>
         

          <Tabs variant="enclosed" colorScheme={"green"}>
            <TabList>
              <Tab fontFamily={"-moz-initial"}>Murabbee</Tab>
              <Tab fontFamily={"-moz-initial"}>Student</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TabStudentForm roleId={2} facultyId={1}/>
              </TabPanel>
              <TabPanel>{/* <TabTeacherForm /> */}
                <TabStudentForm roleId={4} facultyId={session?.user?.facultyId}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Tile>
        {/* <Tile width="30%"></Tile> */}
      </HStack>
    </Template>
  )
}
