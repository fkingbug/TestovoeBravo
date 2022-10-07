import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import { useAppDispatch } from '../../redux/store'

import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { mainAuthStyle, formAuthStyle, rightAuthStyle, leftAuthStyle } from './AuthPage.style'
import { fetchAuth } from '../../redux/slices/auth'

interface authState {
  email: string
  password: string
  showPassword: boolean
}

const AuthPage = () => {
  const dispatch = useAppDispatch()

  const [values, setValues] = useState<authState>({
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof authState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handlelogin = () => {
    dispatch(fetchAuth({ email: 'admin', password: 'admin' }))
  }

  return (
    <Box sx={mainAuthStyle}>
      <Box sx={leftAuthStyle} />
      <Box sx={rightAuthStyle}>
        <Box sx={formAuthStyle}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Email'
            variant='outlined'
            value={values.email}
            onChange={handleChange('email')}
            sx={{ marginBottom: '15px' }}
          />
          <FormControl sx={{ marginBottom: '15px' }} fullWidth variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <Button onClick={handlelogin} fullWidth variant='contained' size='large'>
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthPage
