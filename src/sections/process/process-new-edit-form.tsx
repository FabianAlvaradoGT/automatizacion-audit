import type { IProcessItem } from 'src/types/process'

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

import { TYPE_UPLOAD_OPTIONS, TYPE_PROCESS_OPTIONS } from 'src/_mock/_process'

import { toast } from 'src/components/snackbar'
import { Iconify } from 'src/components/iconify'
import { Form, Field } from 'src/components/hook-form'
import { ConfirmDialog } from 'src/components/custom-dialog'

// ----------------------------------------------------------------------

export type NewProcessSchemaType = zod.infer<typeof NewProcessSchema>

export const NewProcessSchema = zod.object({
  year: zod.string().min(4, { message: 'Año de auditoria es necesario!' }),
  code: zod.string().min(4, { message: 'Código GT Planner es necesario!' }),
  name_code: zod.string().min(1, { message: 'Nombre código es necesario!' }),
  description: zod.string().min(1, { message: 'Descripción es necesario!' }),
  type_upload: zod.string().min(1, { message: 'Tipo de carga es necesario!' }),
  type_process: zod.string().min(1, { message: 'Tipo de proceso es necesario!' }),
})

// ----------------------------------------------------------------------

type Props = {
  currentProcess?: IProcessItem
}

export function ProcessNewEditForm({ currentProcess }: Props) {
  const router = useRouter()
  const confirm = useBoolean()
  const defaultValues = useMemo(
    () => ({
      year: currentProcess?.year || '',
      code: currentProcess?.code || '',
      name_code: currentProcess?.name_code || '',
      description: currentProcess?.description || '',
      type_upload: currentProcess?.type_upload || '',
      type_process: currentProcess?.type_process || '',
    }),
    [currentProcess]
  )

  const methods = useForm<NewProcessSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewProcessSchema),
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
      toast.success(currentProcess ? 'Actualización correcta!' : 'Creación correcta!')
      router.push(paths.process.list)
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
                <Field.Text name="year" label="Año de Auditoria" />
                <Field.Text name="code" label="Código Numérico GT Planner" />
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
              </Box>

              <Stack justifyContent="space-between" sx={{ mt: 3 }} direction="row">
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset()
                    router.push(paths.process.list)
                  }}
                >
                  Cancelar
                </Button>
                <Stack justifyContent="center" alignItems="center" direction="row" gap={2}>
                  {currentProcess && (
                    <LoadingButton
                      variant="soft"
                      color="error"
                      loading={isSubmitting}
                      onClick={confirm.onTrue}
                      startIcon={<Iconify icon="mingcute:delete-line" />}
                    >
                      Borrar Proceso
                    </LoadingButton>
                  )}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    startIcon={<Iconify icon="mingcute:add-line" />}
                  >
                    {currentProcess ? 'Actualizar proceso' : 'Crear proceso'}
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
        title="Borrado de Procesos"
        content={<>¿Estás seguro de que quieres borrar el proceso?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows()
              setTimeout(() => {
                confirm.onFalse()
                toast.success('Proceso borrado')
                router.push(paths.process.list)
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
