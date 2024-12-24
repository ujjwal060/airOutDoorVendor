import React from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClock } from '@coreui/icons'
import './Approval.css' // Create and import a separate CSS file for background styling
import logo1 from './img/logo1.png'

const AccountEvaluation = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="text-center p-4">
              <CCardBody>
                {/* Header Image with background style */}
                <div className="header-image">
                  <img src={logo1} alt="Logo" className="mb-4" style={{ width: '400px' }} />
                </div>

                {/* Main Text */}
                <h2 className="mt-4">We are evaluating your account!</h2>

                {/* Clock Icon */}
                <div className="mt-4">
                  <CIcon icon={cilClock} size="4xl" />
                </div>

                {/* Subtext */}
                <p className="mt-4">
                  We will reach you out via email or phone number for further assistance.
                </p>

                {/* Contact Information */}
                <div className="contact-info">
                  <a href="mailto:xyz@gmail.com" className="email">
                    xyz@gmail.com
                  </a>
                  <span className="mx-3">|</span>
                  <a href="tel:+15026559867" className="phone">
                    +1 (348) 655-9867
                  </a>
                </div>
                <a href="/login" className="phone border px-4 py-1 login-btn">
                  Login
                </a>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AccountEvaluation
