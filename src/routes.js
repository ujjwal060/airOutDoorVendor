import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Base
const Mylisting = React.lazy(() => import('./views/base/tables/Mylisting'))
const Mybooking = React.lazy(() => import('./views/base/Mybooking/Mybooking'))
const Profile = React.lazy(() => import('./views/profile/Profile'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/mylisting', name: 'Mylisting', element: Mylisting },
  { path: '/mybooking', name: 'Mybooking', element: Mybooking },
  { path: '/profile', name: 'Profile', element: Profile },

]

export default routes
