import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'My listing',
  //   to: '/mylisting',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Management',
    to: '/property1',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Property Management',
    to: '/property2',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Management',
  //   to: '/msg',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },

  {
    component: CNavItem,
    name: 'My Bookings',
    to: '/mybooking',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Reviews',
    to: '/review',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Reservations',
    to: '/reservation',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Favourite',
    to: '/favorite',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
 

  {
    component: CNavItem,
    name: 'Invoices',
    to: '/invoice',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Legal',
    to: '/legal',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Inbox',
    to: '/inbox',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Chat',
    to: '/chat',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

]

export default _nav
