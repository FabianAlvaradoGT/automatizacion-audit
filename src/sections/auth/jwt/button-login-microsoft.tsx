import { useTheme } from '@mui/material/styles'
import { Button, Typography, useMediaQuery } from '@mui/material'

import MicrosoftLogo from 'src/assets/icons/microsoft-icon'

import { useAuthContext } from 'src/auth/hooks/use-auth-context'

const ButtonLoginMicrosoft = () => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  const { login } = useAuthContext()
  const handleLogin = async () => {
    try {
      login()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Button
      startIcon={<MicrosoftLogo />}
      onClick={handleLogin}
      sx={{
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white,
        border:
          theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[300]}`
            : `1px solid ${theme.palette.grey[700]}`,
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400],
        },
        pt: '10px',
        pb: '10px',
        borderRadius: '--shape-borderRadius',
      }}
      size="large"
      fullWidth
    >
      <Typography
        variant="button"
        sx={matchDownSM ? { marginLeft: '5px' } : {}}
        style={{ textTransform: 'none' }}
        color={theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]}
      >
        Ingresa con Microsoft
      </Typography>
    </Button>
  )
}

export default ButtonLoginMicrosoft
