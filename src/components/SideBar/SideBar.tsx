import React from 'react'
import { Box, IconButton } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'
import LogoutIcon from '@mui/icons-material/Logout'

import { sideBarStyle, orderbarStyle, activeLink } from './SideBar.style'
import { logout } from '../../redux/slices/auth'

const SideBar = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const onCLickLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={sideBarStyle}>
      <Box sx={orderbarStyle}>
        <IconButton aria-label='order'>
          <Link to='/'>
            <BackupTableOutlinedIcon sx={pathname === '/' ? activeLink : {}} />
          </Link>
        </IconButton>
        <IconButton aria-label='table'>
          <Link to='table'>
            <SpeakerNotesIcon sx={pathname === '/table' ? activeLink : {}} />
          </Link>
        </IconButton>
      </Box>
      <IconButton onCLick={onCLickLogout} aria-label='logOut'>
        <LogoutIcon />
      </IconButton>
    </Box>
  )
}

export default SideBar
