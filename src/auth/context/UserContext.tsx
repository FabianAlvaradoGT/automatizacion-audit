import { useMsal } from '@azure/msal-react'
import React, { useState, useEffect, createContext } from 'react'
import { InteractionStatus, InteractionRequiredAuthError } from '@azure/msal-browser'

import { loginRequest } from 'src/config-global'

import { callMsGraph } from 'src/auth/context/graph'

import type { AuthProps } from '../types'

const initialState: AuthProps = {
  user: {
    id: '',
    email: '',
    name: '',
    displayName: '',
    role: '',
    photoURL: '',
  },
  login: () => {},
  loading: false,
  authenticated: false,
  unauthenticated: false,
  checkUserSession: async () => {},
}

export const userContext = createContext<AuthProps>(initialState)

export const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState(initialState.user)
  const [infoLogin, setInfoLogin] = useState({
    loading: false,
    authenticated: false,
    unauthenticated: false,
    checkUserSession: async () => {},
  })
  const { instance, accounts, inProgress } = useMsal()
  const [apiData, setApiData] = useState(null)

  // console.log('instance', instance.getAllAccounts())

  const login = () => {
    if (!apiData && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then(async (accessTokenResponse) => {
          const { accessToken } = accessTokenResponse

          sessionStorage.setItem('webApiAccessToken', accessTokenResponse.idToken)

          const responseGraph = await callMsGraph(accessToken)
          setApiData(responseGraph)

          setUser({
            id: responseGraph.id,
            email: responseGraph.mail,
            name: responseGraph.displayName,
            displayName: responseGraph.displayName,
            role: responseGraph.jobTitle,
            photoURL: '',
          })

          setInfoLogin({
            loading: false,
            authenticated: true,
            unauthenticated: false,
            checkUserSession: async () => {},
          })
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            const accessTokenResponse: any = instance.acquireTokenRedirect({
              ...loginRequest,
              account: accounts[0],
            })
            sessionStorage.setItem('webApiAccessToken', accessTokenResponse?.idToken)
          }
          console.log(error)
        })
    }
    // else {
    //   console.log('else')
    //   instance
    //     .loginPopup(loginRequest)
    //     .then(async (accessTokenResponse) => {
    //       console.log('accessTokenResponse', accessTokenResponse)
    //       // const { accessToken } = accessTokenResponse

    //       // sessionStorage.setItem('webApiAccessToken', accessTokenResponse.idToken)

    //       // const responseGraph = await callMsGraph(accessToken)

    //       const responseGraph = {
    //         id: 1,
    //         mail: '',
    //         displayName: '',
    //         jobTitle: '',
    //       }
    //       setApiData((prev: any) => ({
    //         ...prev,
    //         ...responseGraph,
    //       }))

    //       setUser({
    //         user: {
    //           id: responseGraph.id,
    //           email: responseGraph.mail,
    //           nombre: responseGraph.displayName,
    //           cargo: responseGraph.jobTitle,
    //           loading: false,
    //         },
    //         loading: false,
    //         authenticated: true,
    //         unauthenticated: false,
    //         login,
    //       })
    //     })
    //     .catch((error) => {
    //       if (error instanceof InteractionRequiredAuthError) {
    //         const accessTokenResponse: any = instance.acquireTokenRedirect({
    //           ...loginRequest,
    //           account: accounts[0],
    //         })
    //         sessionStorage.setItem('webApiAccessToken', accessTokenResponse?.idToken)
    //       }
    //       console.log(error)
    //     })
    // }
  }

  useEffect(() => {
    login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <userContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        login,
        loading: infoLogin.loading,
        authenticated: infoLogin.authenticated,
        unauthenticated: infoLogin.unauthenticated,
        checkUserSession: infoLogin.checkUserSession,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
