import { z as zod } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'

import { toast } from 'src/components/snackbar'
import { Form, Field } from 'src/components/hook-form'

import { useAuthContext } from 'src/auth/hooks'

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>

export const UpdateUserSchema = zod.object({
  area: zod.string().min(1, { message: 'Area is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  status: zod.string(),
})

export function AccountGeneral() {
  const { user } = useAuthContext()

  const defaultValues = {
    area: user?.area || '',
    email: user?.email || '',
    name: user?.displayName || '',
    role: user?.role || '',
    status: user?.status || '',
  }

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success('Update success!')
      console.info('DATA', data)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="name" label="Nombre" sx={{ marginTop: 1 }} onChange={() => {}} />
              <Field.Text name="email" label="Email" sx={{ marginTop: 1 }} onChange={() => {}} />
              <Field.Text name="area" label="Area" sx={{ marginTop: 1 }} onChange={() => {}} />
              <Field.Text name="role" label="Rol" sx={{ marginTop: 1 }} onChange={() => {}} />
              <Field.Text name="status" label="Status" sx={{ marginTop: 1 }} onChange={() => {}} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  )
}
