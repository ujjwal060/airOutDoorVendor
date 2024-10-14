import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Base
const Mylisting = React.lazy(() => import('./views/base/tables/Mylisting'))
const Mybooking = React.lazy(() => import('./views/base/Mybooking/Mybooking'))
const Myreview = React.lazy(() => import('./views/base/Myreview/Myreview'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Property= React.lazy(() => import('./views/base/PropertyManagement/Property'))
const Myreservation= React.lazy(() => import('./views/base/Myreservation/Myreservation'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/mylisting', name: 'Mylisting', element: Mylisting },
  { path: '/mybooking', name: 'Mybooking', element: Mybooking },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/property', name: 'Property', element: Property },
  { path: '/review', name: 'Myreview', element: Myreview },
  { path: '/reservation', name: 'Myreservation', element: Myreservation },

]

export default routes
