import React, { FC } from 'react'
import { Typography } from '@mui/material'

interface TitleProps {
  title: string
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <Typography variant='h1' component='h2'>
      {title}
    </Typography>
  )
}

export default Title
