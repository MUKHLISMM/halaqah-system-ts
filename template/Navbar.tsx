import { Box } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { BsFillSignpost2Fill } from "react-icons/bs";
import { Space } from "antd";
import NavLink from "../component/NavLink";
import AdminMenu from "./AdminMenu";
import SubAdmin from "./FacultyAdmin";
import TeacherMenu from "./MurabbeMenu";
import StudentMunu from "./StudentMunu";
import { SessionAccount } from "../interface/account";
import MurabbeMenu from "./MurabbeMenu";

export default function Navbar() {
  const { data: session }: any = useSession({
    required: true,
  });
  const ses: SessionAccount = session?.user;
  return (
    <>
      <li className="menu-item active">
        
          <Box cursor="pointer" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <Space>
              <MdOutlineDashboardCustomize size={20} />
              <Box>Home</Box>
            </Space>
          </Box>
 
      </li>
      {ses?.roleId === 1 && <AdminMenu />}
      {ses?.roleId === 2 && <SubAdmin />}
      {ses?.roleId === 3 && <MurabbeMenu/>}
      {ses?.roleId === 4 && <StudentMunu />}
    </>
  );
}
