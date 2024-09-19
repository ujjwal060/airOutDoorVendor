import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Air Outdoors Vender
        </a>
        <span className="ms-1"> 2024 </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by</span>
        <a href="https://aayanindia.in/" target="_blank" rel="noopener noreferrer">
          Aayan Infotech 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
