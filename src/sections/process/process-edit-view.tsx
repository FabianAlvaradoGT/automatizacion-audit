import type { IProcessItem } from 'src/types/process'

import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { ProcessNewEditForm } from './process-new-edit-form'

// ----------------------------------------------------------------------

type Props = {
  process?: IProcessItem
}

export function ProcessEditView({ process: currentProcess }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Editar Proceso"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Proceso', href: paths.process.list },
          { name: 'Editar' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProcessNewEditForm currentProcess={currentProcess} />
    </DashboardContent>
  )
}
