import type { IUserItem } from 'src/types/user'

import { z as zod } from 'zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import LoadingButton from '@mui/lab/LoadingButton'

import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'

import { useBoolean } from 'src/hooks/use-boolean'

import { USER_AREA_OPTIONS, USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from 'src/_mock/_user'

import { toast } from 'src/components/snackbar'
import { Iconify } from 'src/components/iconify'
import { Form, Field } from 'src/components/hook-form'
import { ConfirmDialog } from 'src/components/custom-dialog'

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>

export const NewUserSchema = zod.object({
  area: zod.string().min(1, { message: 'Area is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  status: zod.string(),

  isVerified: zod.boolean(),
})

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem
}

export function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter()
  const confirm = useBoolean()
  const defaultValues = useMemo(
    () => ({
      area: currentUser?.area || '',
      email: currentUser?.email || '',
      name: currentUser?.name || '',
      role: currentUser?.role || '',
      status: currentUser?.status || '',

      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  )

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    // control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      toast.success(currentUser ? 'Update success!' : 'Create success!')
      router.push(paths.user.list)
      console.info('DATA', data)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <>
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
                <Field.Text name="name" label="Nombre" sx={{ marginTop: 1 }} />
                <Field.Text name="email" label="Email" sx={{ marginTop: 1 }} />

                <Field.Select name="area" label="Area">
                  {USER_AREA_OPTIONS.map((area) => (
                    <MenuItem key={area.value} value={area.label}>
                      {area.label}
                    </MenuItem>
                  ))}
                </Field.Select>
                <Field.Select name="role" label="Rol">
                  {USER_ROLE_OPTIONS.map((role) => (
                    <MenuItem key={role.value} value={role.label}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Field.Select>

                <Field.Select name="status" label="Status">
                  {USER_STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Box>

              <Stack justifyContent="space-between" sx={{ mt: 3 }} direction="row">
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset()
                    router.push(paths.user.list)
                  }}
                >
                  Cancelar
                </Button>
                <Stack justifyContent="center" alignItems="center" direction="row" gap={2}>
                  {true && (
                    <LoadingButton
                      variant="soft"
                      color="error"
                      loading={isSubmitting}
                      onClick={confirm.onTrue}
                      startIcon={<Iconify icon="mingcute:delete-line" />}
                    >
                      Borrar Usuario
                    </LoadingButton>
                  )}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    startIcon={<Iconify icon="mingcute:add-line" />}
                  >
                    {!currentUser ? 'Crear usuario' : 'Guardar usuario'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Borrado de Usuarios"
        content={<>¿Estás seguro de que quieres borrar el usuario?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows()
              setTimeout(() => {
                confirm.onFalse()
                toast.success('Usuario borrado')
                router.push(paths.user.list)
              }, 1000)
            }}
          >
            Borrar
          </Button>
        }
      />
    </>
  )
}
