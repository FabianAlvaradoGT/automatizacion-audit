import type { IProcessItem } from 'src/types/process'

import { z as zod } from 'zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { TYPE_UPLOAD_OPTIONS, TYPE_PROCESS_OPTIONS } from 'src/_mock'

import { toast } from 'src/components/snackbar'
import { Form, Field } from 'src/components/hook-form'

// ----------------------------------------------------------------------

export type ProcessQuickEditSchemaType = zod.infer<typeof ProcessQuickEditSchema>

export const ProcessQuickEditSchema = zod.object({
  year: zod.string().min(4, { message: 'Año de auditoria es necesario!' }),
  code: zod.string().min(4, { message: 'Código GT Planner es necesario!' }),
  name_code: zod.string().min(1, { message: 'Nombre código es necesario!' }),
  description: zod.string().min(1, { message: 'Descripción es necesario!' }),
  type_upload: zod.string().min(1, { message: 'Tipo de carga es necesario!' }),
  type_process: zod.string().min(1, { message: 'Tipo de proceso es necesario!' }),
  status: zod.string(),
})

// ----------------------------------------------------------------------

type Props = {
  open: boolean
  onClose: () => void
  currentProcess?: IProcessItem
}

export function ProcessQuickEditForm({ currentProcess, open, onClose }: Props) {
  const defaultValues = useMemo(
    () => ({
      year: currentProcess?.year || '',
      code: currentProcess?.code || '',
      name_code: currentProcess?.name_code || '',
      description: currentProcess?.description || '',
      type_upload: currentProcess?.type_upload || '',
      type_process: currentProcess?.type_process || '',
      status: currentProcess?.status || '',
    }),
    [currentProcess]
  )

  const methods = useForm<ProcessQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(ProcessQuickEditSchema),
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
            <Field.Text name="year" label="Año de Auditoria" sx={{ marginTop: 1 }} />
            <Field.Text name="code" label="Código Numérico GT Planner" sx={{ marginTop: 1 }} />
            <Field.Text name="name_code" label="Nombre del código" />

            <Field.Select name="type_upload" label="Tipo de Carga">
              {TYPE_UPLOAD_OPTIONS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Select name="type_process" label="Tipo de Proceso">
              {TYPE_PROCESS_OPTIONS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text name="description" label="Descripción" multiline />

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
