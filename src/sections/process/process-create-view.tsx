import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { ProcessNewEditForm } from './process-new-edit-form'

// ----------------------------------------------------------------------

export function ProcessCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Nuevo Proceso"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Procesos', href: paths.process.list },
          { name: 'Nuevo' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProcessNewEditForm />
    </DashboardContent>
  )
}
