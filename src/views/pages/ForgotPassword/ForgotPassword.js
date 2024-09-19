import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import logo1 from './img/logo1.png';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your backend API to send OTP
      await axios.post('http://localhost:8000/vendor/sendOTP', { email });
      alert('OTP has been sent to your email.');
      navigate('/change-password')
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="text-center" onSubmit={handleSubmit}>
                  <img
                    src={logo1}
                    alt="Logo"
                    className="mb-4"
                    style={{ width: '350px' }}
                  />
                  <h2 className="text-center">Forgot Password</h2>
                  <p className="text-body-secondary text-center">
                    Enter your email to reset your password
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </CInputGroup>

                  <div className="b-grid">
                    <CButton type="submit" color="warning" style={{ color: 'white' }}>
                      Reset Password
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
