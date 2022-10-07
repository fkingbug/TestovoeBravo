import React, { lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { Provider, useSelector } from 'react-redux'

import Mainlayout from './layouts/Mainlayout'
import AuthPage from './pages/AuthPage/AuthPage'
import { theme } from './theme/theme'
import { store } from './redux/store'
import { selectIsAuth } from './redux/slices/auth'

const OrderPage = lazy(
  () => import(/* webpackChunkName: 'OrderPage' */ './pages/OrderPage/OrderPage')
)
const TablePage = lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ './pages/TablePage/TablePage')
)

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
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
            <Route path='/auth' element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
