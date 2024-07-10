import 'src/global.css'

import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'

import { Router } from 'src/routes/sections'

import { useScrollToTop } from 'src/hooks/use-scroll-to-top'

import { msalConfig } from 'src/config-global'
import { ThemeProvider } from 'src/theme/theme-provider'

import { ProgressBar } from 'src/components/progress-bar'
import { MotionLazy } from 'src/components/animate/motion-lazy'
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings'

import { UserProvider } from 'src/auth/context/UserContext'

export default function App() {
  useScrollToTop()

  const msalInstance = new PublicClientApplication(msalConfig)

  return (
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <MotionLazy>
              <ProgressBar />
              <SettingsDrawer />
              <Router />
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </UserProvider>
    </MsalProvider>
  )
}
