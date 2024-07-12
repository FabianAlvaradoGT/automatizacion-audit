import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { UserNewEditForm } from './user-new-edit-form'

// ----------------------------------------------------------------------

export function UserCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Nuevo Usuario"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Usuarios', href: paths.user.list },
          { name: 'Nuevo' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm />
    </DashboardContent>
  )
}
