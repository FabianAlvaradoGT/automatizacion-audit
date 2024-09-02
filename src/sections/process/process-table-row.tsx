import type { IProcessItem } from 'src/types/process'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'

import { useBoolean } from 'src/hooks/use-boolean'

import { TYPE_UPLOAD_OPTIONS, TYPE_PROCESS_OPTIONS, PROCESS_STATUS_OPTIONS } from 'src/_mock'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { ConfirmDialog } from 'src/components/custom-dialog'
import { usePopover, CustomPopover } from 'src/components/custom-popover'

import { ProcessQuickEditForm } from './process-quick-edit-form'

// ----------------------------------------------------------------------

type Props = {
  row: IProcessItem
  selected: boolean
  onEditRow: () => void
  onSelectRow: () => void
  onDeleteRow: () => void
}

export function ProcessTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {
  const confirm = useBoolean()

  const popover = usePopover()

  const quickEdit = useBoolean()

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name_code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {TYPE_PROCESS_OPTIONS.find((item) => item.value === row.type_process)?.label ?? '-'}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {TYPE_UPLOAD_OPTIONS.find((item) => item.value === row.type_upload)?.label ?? '-'}
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'closed' && 'error') ||
              'default'
            }
          >
            {PROCESS_STATUS_OPTIONS.find((item) => item.value === row.status)?.label ?? '-'}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Editar" placement="top" arrow>
              <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={quickEdit.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <ProcessQuickEditForm
        currentProcess={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue()
              popover.onClose()
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Borrar
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow()
              popover.onClose()
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Editar
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Borrar proceso"
        content="¿Estás seguro de que quieres borrar?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Borrar
          </Button>
        }
      />
    </>
  )
}
