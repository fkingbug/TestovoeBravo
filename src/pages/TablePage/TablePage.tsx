import React, { useEffect } from 'react'
import TableComponent from '../../components/TableComponent/TableComponent'
import { fetchTableOrder } from '../../redux/slices/order'
import { useAppDispatch } from '../../redux/store'
import { Box } from '@mui/material'
import { TableStyle } from './TablePage.style'
import Title from '../../components/Title/Title'

const TablePage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTableOrder())
  }, [dispatch])

  return (
    <Box sx={TableStyle}>
      <Title title='Заказы' />
      <TableComponent />
    </Box>
  )
}

export default TablePage
