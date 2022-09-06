import { Box } from '@chakra-ui/react'
import { Space } from 'antd'
import React from 'react'
import { BsFillSignpost2Fill } from 'react-icons/bs'
import { ImMakeGroup } from 'react-icons/im'
import { MdOutlineManageAccounts } from 'react-icons/md'
import NavLink from '../component/NavLink'

export default function AdminMenu() {
  return (
    <>
    <li className="menu-header small text-uppercase">
    <span className="menu-header-text">ADMIN</span>
  </li>
  <li className="menu-item">
    <Box cursor="pointer" className="menu-link">
      <i className="menu-icon tf-icons bx bx-crown"></i>
      <Space>
        <BsFillSignpost2Fill size={20} />
        <Box>Posts</Box>
      </Space>
    </Box>
  </li>
  <li className="menu-item">
    <NavLink href={"/admin/account"}>
    <Box  className="menu-link">
      <i className="menu-icon tf-icons bx bx-collection"></i>
      <Space>
        <MdOutlineManageAccounts size={20} />
        <Box>Users</Box>
      </Space>
    </Box>
    </NavLink>
  </li>
  <li className="menu-item">
    <Box cursor="pointer" className="menu-link">
      <i className="menu-icon tf-icons bx bx-crown"></i>
      <Space>
        <ImMakeGroup size={20} />
        <Box>Halaqah</Box>
      </Space>
    </Box>
  </li>
  </>
  );
}
