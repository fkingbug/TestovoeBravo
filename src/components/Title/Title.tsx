import React, { FC } from 'react'
import { Typography } from '@mui/material'
import { titleStyle } from './Title.style'
interface TitleProps {
  title: string
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <Typography variant='h3' component='h3' sx={titleStyle}>
      {title}
    </Typography>
  )
}

export default Title
