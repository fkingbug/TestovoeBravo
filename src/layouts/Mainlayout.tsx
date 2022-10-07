import React from 'react'

import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import SideBar from '../components/SideBar/SideBar'
import { sideBarStyle, mainContentStyle } from './Mainlayout.style'
const Mainlayout = () => {
  return (
    <Box sx={sideBarStyle}>
      <SideBar />
      <Box sx={mainContentStyle}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Mainlayout
