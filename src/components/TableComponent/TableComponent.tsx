import React from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { useSelector } from 'react-redux'
import { selectOrderTable } from '../../redux/slices/order'

const TableComponent = () => {
  const orders = useSelector(selectOrderTable)
  console.log('orders', orders)

  function createData(name: string, size: number) {
    return { name, size }
  }
  const rows = orders.map(e => createData(e.name, e.workers.length))

  return (
    <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
      <Table sx={{ maxWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#221e1e' }}>
            <TableCell sx={{ color: 'white' }}>Заказы</TableCell>
            <TableCell sx={{ color: 'white' }} align='right'>
              Кол-во
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
