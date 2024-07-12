import type { IUserItem } from 'src/types/user'

import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import { UserNewEditForm } from '../user-new-edit-form'

// ----------------------------------------------------------------------

type Props = {
  user?: IUserItem
}

export function UserEditView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Editar Usuario"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Usuarios', href: paths.user.list },
          { name: 'Editar' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </DashboardContent>
  )
}
