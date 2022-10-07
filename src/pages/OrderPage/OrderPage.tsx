import React, { useEffect } from 'react'

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useAppDispatch } from '../../redux/store'

import { fromStyle, orderStyle } from './OrderPage.style'
import { fetchWorkers, selectWorkers } from '../../redux/slices/workers'
import { useSelector } from 'react-redux'
const OrderPage = () => {
  const dispatch = useAppDispatch()
  const { workers } = useSelector(selectWorkers)

  const [workersData, setWorkersData] = React.useState('')
  const [inputData, setInputData] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setWorkersData(event.target.value as string)
  }
  // usecontoler(name , )
  // contoll(usecintrol )

  useEffect(() => {
    dispatch(fetchWorkers())
  }, [dispatch])

  return (
    <Box sx={orderStyle}>
      <Box sx={fromStyle}>
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel id='demo-simple-select-label'>Сотрудники</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={workersData}
            label='Workers'
            disabled={!workers.length}
            onChange={handleChange}
          >
            {workers.map(worker => (
              <MenuItem key={worker.id} value={worker.name}>
                {worker.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Order'
          variant='outlined'
          value={inputData}
          onChange={e => setInputData(e.target.value)}
          sx={{ marginBottom: '15px' }}
        />
        <Button fullWidth variant='contained' size='large'>
          Contained
        </Button>
      </Box>
    </Box>
  )
}

export default OrderPage
