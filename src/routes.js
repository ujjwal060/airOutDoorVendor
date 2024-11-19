import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Base
const Mylisting = React.lazy(() => import('./views/base/tables/Mylisting'))
const Mybooking = React.lazy(() => import('./views/base/Mybooking/Mybooking'))
const Myreview = React.lazy(() => import('./views/base/Myreview/Myreview'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Property= React.lazy(() => import('./views/base/PropertyManagement/Property'))
const Myreservation= React.lazy(() => import('./views/base/Myreservation/Myreservation'))
const Mylegal= React.lazy(() => import('./views/base/Mylegal/Mylegal'))
const W9= React.lazy(() => import('./views/base/W9/W9'))
const Generalinstruction= React.lazy(() => import('./views/base/Generalinstruction/Generalinstruction'))
const Generalinstruction2= React.lazy(() => import('./views/base/Generalinstruction2/Generalinstruction'))
const Myfavorite= React.lazy(() => import('./views/base/Myfavorite/Myfavorite'))
const Myinvoice= React.lazy(() => import('./views/base/Myinvoice/Myinvoice'))
const Myinbox= React.lazy(() => import('./views/base/Myinbox/Myinbox'))
const ChatBox= React.lazy(() => import('./views/base/ChatBox/ChatBox'))
const MessageList= React.lazy(() => import('./views/base/MessageList/MessageList'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/mylisting', name: 'Mylisting', element: Mylisting },
  { path: '/mybooking', name: 'Mybooking', element: Mybooking },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/property1', name: 'Property', element: Property },
  { path: '/review', name: 'Myreview', element: Myreview },
  { path: '/reservation', name: 'Myreservation', element: Myreservation },
  { path: '/legal', name: 'Mylegal', element: Mylegal },
  { path: '/w9', name: 'W9', element: W9 },
  { path: '/general', name: 'Generalinstruction', element: Generalinstruction },
  { path: '/general2', name: 'Generalinstruction2', element: Generalinstruction2 },
  { path: '/favorite', name: 'Myfavorite', element: Myfavorite },
  { path: '/invoice', name: 'Myinvoice', element: Myinvoice },
  { path: '/inbox', name: 'Myinbox', element: Myinbox },
  { path: '/chat', name: 'ChatBox', element: ChatBox },
  { path: '/property', name: 'MessageList', element: MessageList },

]

export default routes
