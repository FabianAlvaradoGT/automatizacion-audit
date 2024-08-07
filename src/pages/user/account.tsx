import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

import { AccountView } from 'src/sections/account'

// ----------------------------------------------------------------------

const metadata = { title: `Perfil - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountView />
    </>
  )
}
