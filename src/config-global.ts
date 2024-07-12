import { LogLevel } from '@azure/msal-browser'

import { paths } from 'src/routes/paths'

import packageJson from '../package.json'

// ----------------------------------------------------------------------

export type ConfigValue = {
  site: {
    name: string
    serverUrl: string
    assetURL: string
    basePath: string
    version: string
  }
  auth: {
    method: 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0'
    skip: boolean
    redirectPath: string
  }
  mapbox: {
    apiKey: string
  }
  firebase: {
    appId: string
    apiKey: string
    projectId: string
    authDomain: string
    storageBucket: string
    measurementId: string
    messagingSenderId: string
  }
  amplify: { userPoolId: string; userPoolWebClientId: string; region: string }
  auth0: { clientId: string; domain: string; callbackUrl: string }
  supabase: { url: string; key: string }
}

// ----------------------------------------------------------------------

export const loginRequest = {
  scopes: ['https://graph.microsoft.com/.default', 'openid'],
}

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_APP_CLIENT_ID || '',
    authority: import.meta.env.VITE_APP_AUTHORITY || '',
    redirectUri: '/home',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) return

        switch (level) {
          case LogLevel.Error:
            console.error(message)
            break

          case LogLevel.Info:
            // console.info(message)
            break

          case LogLevel.Verbose:
            // console.debug(message)
            break

          case LogLevel.Warning:
            // console.warn(message)
            break

          default:
            break
        }
      },
    },
  },
}

export const CONFIG: ConfigValue = {
  site: {
    name: 'Automatización Audit',
    serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
    assetURL: import.meta.env.VITE_ASSET_URL ?? '',
    basePath: import.meta.env.VITE_BASE_PATH ?? '',
    version: packageJson.version,
  },
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * APMapboxI
   */
  mapbox: {
    apiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? '',
  },
  /**
   * Firebase
   */
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FIREBASE_APPID ?? '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: import.meta.env.VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: import.meta.env.VITE_AWS_AMPLIFY_REGION ?? '',
  },
  /**
   * Auth0
   */
  auth0: {
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? '',
    domain: import.meta.env.VITE_AUTH0_DOMAIN ?? '',
    callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL ?? '',
  },
  /**
   * Supabase
   */
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL ?? '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  },
}
