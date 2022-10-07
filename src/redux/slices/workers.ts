import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'

interface IWorkersState {
  workers: IWorkers[]
}
interface IWorkers {
  id: number
  name: string
}

export const fetchWorkers = createAsyncThunk<IWorkers[]>('workers/fetchWorkers', async () => {
  const { data } = await axios.get<IWorkers[]>('/workers')
  return data
})

const initialState: IWorkersState = {
  workers: [],
}

const workersSLice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWorkers.fulfilled, (state, action) => {
      state.workers = action.payload
    })
  },
})

export const selectWorkers = (state: RootState) => state.workers

export default workersSLice.reducer
