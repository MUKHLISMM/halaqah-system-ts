import { Box } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { BsFillSignpost2Fill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { ImMakeGroup } from "react-icons/im";
import { Space } from "antd";
import NavLink from "../component/NavLink";
import AdminMenu from "./AdminMenu";
import SubAdmin from "./SubAdmin";
import TeacherMenu from "./TeacherMenu";
import StudentMunu from "./StudentMunu";
import { SessionAccount } from "../interface/account";

export default function Navbar() {
  const { data: session }: any = useSession({
    required: true,
  });
  const ses: SessionAccount = session?.user;
  return (
    <>
      <li className="menu-item active">
        <NavLink href={"/"}>
          <Box cursor="pointer" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <Space>
              <MdOutlineDashboardCustomize size={20} />
              <Box>Home</Box>
            </Space>
          </Box>
        </NavLink>
      </li>
      {ses?.roleId === 1 && <AdminMenu />}
      {ses?.roleId === 2 && <SubAdmin />}
      {ses?.roleId === 3 && <TeacherMenu />}
      {ses?.roleId === 4 && <StudentMunu />}
    </>
  );
}
