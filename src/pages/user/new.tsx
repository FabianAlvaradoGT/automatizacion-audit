import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

import { UserCreateView } from 'src/sections/user'

// ----------------------------------------------------------------------

const metadata = { title: `Nuevo Usuario - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserCreateView />
    </>
  )
}
