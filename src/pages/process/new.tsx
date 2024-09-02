import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

import { ProcessCreateView } from 'src/sections/process'

// ----------------------------------------------------------------------

const metadata = { title: `Nuevo Proceso - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProcessCreateView />
    </>
  )
}
