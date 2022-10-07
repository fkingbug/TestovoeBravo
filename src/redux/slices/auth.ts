import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'

interface IAuth {
  email: string
  password: string
}

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: IAuth) => {
  const { data } = await axios.post('/auth', params)
  return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me')
  return data
})
interface IState {
  data: null | any
  status: string
}

const initialState: IState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.data = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAuth.pending, state => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = 'reject'
      state.data = null
    })
    builder.addCase(fetchAuthMe.pending, state => {
      state.status = 'loading'
      state.data = null
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = 'loading'
      state.data = null
    })
  },
})

export const selectIsAuth = (state: RootState) => !!state.auth.data
export const selectStatus = (state: RootState) => state.auth.status

export default authSlice.reducer

export const { logout } = authSlice.actions
