import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { IOrder } from '../../pages/OrderPage/OrderPage'
import { RootState } from '../store'

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (params: IOrder) => {
  const { data } = await axios.post('/order', params)
  console.log(data)
  return data
})
export const fetchTableOrder = createAsyncThunk('order/fetchTableOrder', async () => {
  const { data } = await axios.get('/tableORders')
  console.log(data)
  return data
})

interface ITable {
  name: string
  workers: string[]
}
interface IOrderRedux {
  data: boolean | null
  table: ITable[]
  status: string
}
const initialState: IOrderRedux = {
  data: null,
  table: [],
  status: '',
}

const orderSLice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrder.pending, state => {
      state.data = null
    })
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.data = action.payload.success
    })
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.data = false
    })
    builder.addCase(fetchTableOrder.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchTableOrder.fulfilled, (state, action) => {
      state.table = action.payload
    })
    builder.addCase(fetchTableOrder.rejected, (state, action) => {
      state.status = 'reject'
    })
  },
})

export const selectOrderSuccess = (state: RootState) => state.order.data
export const selectOrderTable = (state: RootState) => state.order.table

export default orderSLice.reducer
