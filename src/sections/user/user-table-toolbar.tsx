import type { IUserTableFilters } from 'src/types/user'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { UseSetStateReturn } from 'src/hooks/use-set-state'

import { useCallback } from 'react'

import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { MenuList, IconButton, InputLabel } from '@mui/material'

import { Iconify } from 'src/components/iconify'
import { usePopover, CustomPopover } from 'src/components/custom-popover'

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void
  filters: UseSetStateReturn<IUserTableFilters>
  options: {
    roles: string[]
    print?: boolean
    import?: boolean
    export?: boolean
  }
}

export function UserTableToolbar({ filters, options, onResetPage }: Props) {
  const popover = usePopover()

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage()
      filters.setState({ name: event.target.value })
    },
    [filters, onResetPage]
  )

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value

      onResetPage()
      filters.setState({ role: newValue })
    },
    [filters, onResetPage]
  )

  const hasMoreOptions = options.print || options.import || options.export

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
          <InputLabel htmlFor="user-filter-role-select-label">Rol</InputLabel>
          <Select
            multiple
            value={filters.state.role}
            onChange={handleFilterRole}
            input={<OutlinedInput label="Role" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'user-filter-role-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
            size="medium"
          >
            {options.roles.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.role.includes(option)}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            size="medium"
            placeholder="Buscar..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          {hasMoreOptions && (
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {options.print && (
            <MenuItem
              onClick={() => {
                popover.onClose()
              }}
            >
              <Iconify icon="solar:printer-minimalistic-bold" />
              Imprimir
            </MenuItem>
          )}

          {options.import && (
            <MenuItem
              onClick={() => {
                popover.onClose()
              }}
            >
              <Iconify icon="solar:import-bold" />
              Importar
            </MenuItem>
          )}

          {options.export && (
            <MenuItem
              onClick={() => {
                popover.onClose()
              }}
            >
              <Iconify icon="solar:export-bold" />
              Exportar
            </MenuItem>
          )}
        </MenuList>
      </CustomPopover>
    </>
  )
}
