import { Box } from '@chakra-ui/react'
import { Space } from 'antd'
import React from 'react'
import { ImMakeGroup } from 'react-icons/im'

export default function TeacherMenu() {
  return (
    <>
    <li className="menu-header small text-uppercase">
    <span className="menu-header-text">Teacher</span>
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
  )
}
