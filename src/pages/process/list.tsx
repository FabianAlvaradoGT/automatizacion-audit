import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

import { ProcessListView } from 'src/sections/process'

// ----------------------------------------------------------------------

const metadata = { title: `Lista de Procesos - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProcessListView />
    </>
  )
}
