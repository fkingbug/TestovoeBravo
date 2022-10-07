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

interface IState {
  data: null | any
  status: string
}

const initialState: IState = {
  data: null,
  status: '',
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
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = 'error'
    })
  },
})

export const selectIsAuth = (state: RootState) => !!state.auth.data

export default authSlice.reducer

export const { logout } = authSlice.actions
