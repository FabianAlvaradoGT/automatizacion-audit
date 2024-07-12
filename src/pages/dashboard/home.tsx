import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/config-global'

import { HomeView } from 'src/sections/dashboard/home'

// ----------------------------------------------------------------------

const metadata = { title: `Home | Dashboard - ${CONFIG.site.name}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView title="Home" />
    </>
  )
}
