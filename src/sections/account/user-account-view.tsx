import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { AccountGeneral } from './account-general'

export function AccountView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Perfil"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Usuario', href: paths.user.list },
          { name: 'Perfil' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AccountGeneral />
    </DashboardContent>
  )
}
