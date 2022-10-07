import React, { useEffect } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAppDispatch } from '../../redux/store'

import { fromStyle, orderStyle } from './OrderPage.style'
import { fetchWorkers, selectWorkers } from '../../redux/slices/workers'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { fetchOrder, selectOrderSuccess } from '../../redux/slices/order'
import AlertComponent from '../../components/AlertComponent/AlertComponent'
import Title from '../../components/Title/Title'

export interface IOrder {
  name: string
  workers: string
}

const OrderPage = () => {
  const dispatch = useAppDispatch()
  const { workers } = useSelector(selectWorkers)

  const status = useSelector(selectOrderSuccess)
  const { handleSubmit, control, register } = useForm<IOrder>()

  useEffect(() => {
    dispatch(fetchWorkers())
  }, [dispatch])

  const onSubmit: SubmitHandler<IOrder> = async data => {
    const value = await dispatch(fetchOrder(data))
  }

  return (
    <Box sx={orderStyle}>
      <Box sx={fromStyle}>
        <Title title='Оформить заказ' />
        <form id='order' onSubmit={handleSubmit(onSubmit)} action=''>
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel id='demo-simple-select-label'>Сотрудники</InputLabel>
            <Controller
              name='workers'
              defaultValue=''
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={value}
                  label='Сотрудники'
                  disabled={!workers.length}
                  onChange={onChange}
                >
                  {workers.map(worker => (
                    <MenuItem key={worker.id} value={worker.name}>
                      {worker.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Заказ'
            variant='outlined'
            {...register('name')}
            sx={{ marginBottom: '15px' }}
          />
          <Button type='submit' fullWidth variant='contained' size='large' form='order'>
            Заказать
          </Button>
        </form>
        <Box>
          {status !== null && (
            <AlertComponent
              status={status}
              text={
                !status
                  ? 'Вы  уже отправляли заявку на этот документ, она уже была учтена'
                  : 'заявка была учтена'
              }
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderPage
