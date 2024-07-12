import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { useAuthContext } from 'src/auth/hooks'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function HomeView({ title = 'Blank' }: Props) {
  const { user } = useAuthContext()
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Typography variant="h3">
        {user?.displayName}, Bienvenido a Automatización Audit ⚙️🤖🦾
      </Typography>

      <Typography variant="h5" sx={{ mt: 5 }}>
        🤔 ¿Qué es Automatización Audit?
      </Typography>

      <Typography variant="body1" sx={{ mt: 1 }}>
        <li>
          Automatización Audit es una plataforma que permite a los auditores automatizar la revisión
          de documentos de una empresa.
        </li>
      </Typography>

      <Typography variant="h5" sx={{ mt: 5 }}>
        🛠️ ¿Cómo funciona?
      </Typography>

      <Typography variant="body1" sx={{ mt: 1 }}>
        <li>
          Automatización Audit permite a los auditores cargar documentos de una empresa, y luego
          configurar reglas de auditoría para revisar los documentos automáticamente.
        </li>
      </Typography>
    </DashboardContent>
  )
}
