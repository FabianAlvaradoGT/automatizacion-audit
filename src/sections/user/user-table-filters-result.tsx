import type { IUserTableFilters } from 'src/types/user'
import type { Theme, SxProps } from '@mui/material/styles'
import type { UseSetStateReturn } from 'src/hooks/use-set-state'

import { useCallback } from 'react'

import Chip from '@mui/material/Chip'

import { USER_STATUS_OPTIONS } from 'src/_mock/_user'

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result'

// ----------------------------------------------------------------------

type Props = {
  totalResults: number
  sx?: SxProps<Theme>
  onResetPage: () => void
  filters: UseSetStateReturn<IUserTableFilters>
}

export function UserTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage()
    filters.setState({ name: '' })
  }, [filters, onResetPage])

  const handleRemoveStatus = useCallback(() => {
    onResetPage()
    filters.setState({ status: 'all' })
  }, [filters, onResetPage])

  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      const newValue = filters.state.role.filter((item) => item !== inputValue)

      onResetPage()
      filters.setState({ role: newValue })
    },
    [filters, onResetPage]
  )

  const handleReset = useCallback(() => {
    onResetPage()
    filters.onResetState()
  }, [filters, onResetPage])

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={USER_STATUS_OPTIONS.find((item) => item.value === filters.state.status)?.label}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Rol:" isShow={!!filters.state.role.length}>
        {filters.state.role.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRole(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  )
}
