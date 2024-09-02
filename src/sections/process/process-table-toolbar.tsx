import type { IProcessTableFilters } from 'src/types/process'
import type { UseSetStateReturn } from 'src/hooks/use-set-state'

import { useCallback } from 'react'

import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { MenuList, IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import { usePopover, CustomPopover } from 'src/components/custom-popover'

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void
  filters: UseSetStateReturn<IProcessTableFilters>
  options: {
    print?: boolean
    import?: boolean
    export?: boolean
  }
}

export function ProcessTableToolbar({ filters, options, onResetPage }: Props) {
  const popover = usePopover()

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage()
      filters.setState({ name: event.target.value })
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
