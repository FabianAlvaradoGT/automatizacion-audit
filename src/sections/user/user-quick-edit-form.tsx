import type { IUserItem } from 'src/types/user'

import { z as zod } from 'zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidPhoneNumber } from 'react-phone-number-input/input'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { USER_AREA_OPTIONS, USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from 'src/_mock'

import { toast } from 'src/components/snackbar'
import { Form, Field, schemaHelper } from 'src/components/hook-form'

// ----------------------------------------------------------------------

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  area: zod.string().min(1, { message: 'Area is required!' }),
  status: zod.string(),
})

// ----------------------------------------------------------------------

type Props = {
  open: boolean
  onClose: () => void
  currentUser?: IUserItem
}

export function UserQuickEditForm({ currentUser, open, onClose }: Props) {
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
      area: currentUser?.area || '',
    }),
    [currentUser]
  )

  const methods = useForm<UserQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      reset()
      onClose()

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
      })

      await promise

      console.info('DATA', data)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edición Rápida</DialogTitle>
        <DialogContent>
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}
