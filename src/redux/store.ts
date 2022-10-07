import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import workers from './slices/workers'
import auth from './slices/auth'

export const store = configureStore({
  reducer: {
    workers,
    auth,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
