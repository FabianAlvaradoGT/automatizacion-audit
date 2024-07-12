import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CONFIG } from 'src/config-global'
import { DashboardLayout } from 'src/layouts/dashboard'

import { LoadingScreen } from 'src/components/loading-screen'

import { AuthGuard } from 'src/auth/guard'

// ----------------------------------------------------------------------

const ListPage = lazy(() => import('src/pages/user/list'))
const NewPage = lazy(() => import('src/pages/user/new'))
const EditPage = lazy(() => import('src/pages/user/edit'))
const ProfilePage = lazy(() => import('src/pages/user/account'))

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
)

export const manageRoutes = [
  {
    path: 'user',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { path: 'list', element: <ListPage /> },
      { path: 'new', element: <NewPage /> },
      { path: ':id/edit', element: <EditPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]
