import React, { FC } from 'react'
import { Box, Alert, IconButton, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
interface AlertComponentProps {
  status: boolean
  text: string
}

const AlertComponent: FC<AlertComponentProps> = ({ status, text }) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={!status ? 'error' : 'success'}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  )
}
export default AlertComponent
