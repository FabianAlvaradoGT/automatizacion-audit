import type { IProcessItem, IProcessTableFilters } from 'src/types/process'

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'

import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'

import { useBoolean } from 'src/hooks/use-boolean'
import { useSetState } from 'src/hooks/use-set-state'

import { varAlpha } from 'src/theme/styles'
import { DashboardContent } from 'src/layouts/dashboard'
import { _processList, PROCESS_STATUS_OPTIONS } from 'src/_mock'

import { Label } from 'src/components/label'
import { toast } from 'src/components/snackbar'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { ConfirmDialog } from 'src/components/custom-dialog'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table'

import { ProcessTableRow } from './process-table-row'
import { ProcessTableToolbar } from './process-table-toolbar'
import { ProcessTableFiltersResult } from './process-table-filters-result'

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }, ...PROCESS_STATUS_OPTIONS]

const TABLE_HEAD = [
  { id: 'code', label: 'Codigo' },
  { id: 'name_code', label: 'Nombre Código' },
  { id: 'type_process', label: 'Tipo Proceso' },
  { id: 'type_upload', label: 'Tipo Carga' },
  { id: 'status', label: 'Status' },
  { id: '', width: 88 },
]

// ----------------------------------------------------------------------

export function ProcessListView() {
  const table = useTable()

  const router = useRouter()

  const confirm = useBoolean()

  const [tableData, setTableData] = useState<IProcessItem[]>(_processList)

  const filters = useSetState<IProcessTableFilters>({ name: '', status: 'all' })

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  })

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage)

  const canReset = !!filters.state.name || filters.state.status !== 'all'

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id)

      toast.success('Borrar exitoso!')

      setTableData(deleteRow)

      table.onUpdatePageDeleteRow(dataInPage.length)
    },
    [dataInPage.length, table, tableData]
  )

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id))

    toast.success(`Borrado ${table.selected.length} procesos!`)

    setTableData(deleteRows)

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    })
  }, [dataFiltered.length, dataInPage.length, table, tableData])

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.process.edit(id))
    },
    [router]
  )

  const handleFilterStatus = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      table.onResetPage()
      filters.setState({ status: newValue })
    },
    [filters, table]
  )

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Listado de Procesos"
          links={[
            { name: 'Home', href: paths.dashboard.root },
            { name: 'Procesos' },
            { name: 'Listado' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.process.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nuevo Proceso
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'closed' && 'error') ||
                      'default'
                    }
                  >
                    {['active', 'closed'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <ProcessTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{
              print: false,
              import: false,
              export: true,
            }}
          />

          {canReset && (
            <ProcessTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked: any) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Borrar">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked: any) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ProcessTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            // onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Borrado de Usuarios"
        content={
          <>
            ¿Estás seguro de que quieres borrar <strong> {table.selected.length} </strong> usuarios?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows()
              confirm.onFalse()
            }}
          >
            Borrar
          </Button>
        }
      />
    </>
  )
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IProcessItem[]
  filters: IProcessTableFilters
  comparator: (a: any, b: any) => number
}

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { name, status } = filters

  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (name) {
    inputData = inputData.filter(
      (item) =>
        item.code.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        item.name_code.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        item.type_process.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        item.type_upload.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  if (status !== 'all') {
    inputData = inputData.filter((item) => item.status === status)
  }

  return inputData
}
