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
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../redux/store'

import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { mainAuthStyle, formAuthStyle, rightAuthStyle, leftAuthStyle } from './AuthPage.style'
import { fetchAuth } from '../../redux/slices/auth'
import Title from '../../components/Title/Title'

interface IFormAuth {
  email: string
  password: string
}

const AuthPage = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<IFormAuth>()

  const onSubmit: SubmitHandler<IFormAuth> = async data => {
    const value = await dispatch(fetchAuth(data))
    if (!value.payload) {
      return alert('не удалось авторизироваться')
    }
    if ('token' in value.payload) {
      window.localStorage.setItem('token', value.payload.token)
    }
    reset()
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <Box sx={mainAuthStyle}>
      <Box sx={leftAuthStyle} />
      <Box sx={rightAuthStyle}>
        <Box sx={formAuthStyle}>
          <Title title='Логин' />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Email'
              {...register('email')}
              variant='outlined'
              sx={{ marginBottom: '15px' }}
            />
            <FormControl sx={{ marginBottom: '15px' }} fullWidth variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            <Button type='submit' fullWidth variant='contained' size='large'>
              Войти
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthPage
