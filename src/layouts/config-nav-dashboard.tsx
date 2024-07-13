import { paths } from 'src/routes/paths'

import { Iconify } from 'src/components/iconify'

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'Menu',
    items: [{ title: 'Home', path: paths.dashboard.root, icon: <Iconify icon="carbon:home" /> }],
  },
  {
    subheader: 'Administración',
    items: [
      { title: 'Usuarios', path: paths.user.list, icon: <Iconify icon="clarity:users-line" /> },
      { title: 'Perfil', path: paths.user.profile, icon: <Iconify icon="gg:profile" /> },
    ],
  },
]
