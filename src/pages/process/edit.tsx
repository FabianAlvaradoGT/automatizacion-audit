import { Helmet } from 'react-helmet-async'

import { useParams } from 'src/routes/hooks'

import { CONFIG } from 'src/config-global'
import { _processList } from 'src/_mock/_process'

import { ProcessEditView } from 'src/sections/process'

// ----------------------------------------------------------------------

const metadata = { title: `Editar Proceso - ${CONFIG.site.name}` }

export default function Page() {
  const { id = '' } = useParams()

  const currentUser = _processList.find((item) => item.id === id)

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProcessEditView process={currentUser} />
    </>
  )
}
