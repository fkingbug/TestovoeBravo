import React, { useEffect, lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { Provider, useSelector } from 'react-redux'

import Mainlayout from './layouts/Mainlayout'
import AuthPage from './pages/AuthPage/AuthPage'
import { theme } from './theme/theme'
import { store, useAppDispatch } from './redux/store'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'

const OrderPage = lazy(
  () => import(/* webpackChunkName: 'OrderPage' */ './pages/OrderPage/OrderPage')
)
const TablePage = lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ './pages/TablePage/TablePage')
)

const App = () => {
  const dispatch = useAppDispatch()

  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  if (!isAuth) {
    return (
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Mainlayout />}>
        <Route
          path=''
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <OrderPage />
            </Suspense>
          }
        />
        <Route
          path='table'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <TablePage />
            </Suspense>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
