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
import React, { useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";
import AddButton from "../../component/AddButton";
import Tile from "../../component/Tile";
import TableHalaqah from "../../Table/TableHalaqah";
import Template from "../../template/Template";
import { primaryColor } from "../../theme";

export default function halaqah() {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const onClose = () => {
    setId(null);
    setShow(false);
  };

  return (
    <Template>
      <HStack>
        <Tile>
          <Heading size="md" fontSize="20px" pb={5} color="blackAlpha.800">
            Halaqah Al-Quran
          </Heading>
         

          <Tabs variant="enclosed" colorScheme={"green"}>
            <TabList>
              <Tab fontFamily={"-moz-initial"}>Activity</Tab>
              <Tab fontFamily={"-moz-initial"}>GroupMember</Tab>
              <Tab fontFamily={"-moz-initial"}>AssessmentCertificate</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box pb={5}>
                  <Flex>
                    <Space>
                      <TbBooks size={20} />
                      <Heading size="md" fontSize="17px" color={primaryColor}>
                        Weekly Activity
                      </Heading>
                    </Space>
                    <Spacer />
                    <AddButton
                      onClick={() => {
                        setId(null);
                        setShow(true);
                      }}
                    >
                      <HiOutlineViewGridAdd size={20} />
                    </AddButton>
                  </Flex>
                </Box>
                <TableHalaqah />
              </TabPanel>
              <TabPanel>{/* <TabTeacherForm /> */}</TabPanel>
              <TabPanel>{/* <TabStudentForm /> */}</TabPanel>
            </TabPanels>
          </Tabs>
        </Tile>
        {/* <Tile width="30%"></Tile> */}
      </HStack>
    </Template>
  );
}
