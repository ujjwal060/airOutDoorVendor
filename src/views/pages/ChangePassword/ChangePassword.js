import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from './img/logo1.png';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilCheckCircle } from '@coreui/icons'; // Add green tick icon

const Change = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');  // Add email state
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const otpString = otp.join('');
      const response = await axios.post('http://localhost:8000/vendor/verifyOTP', { email, otp: otpString });
      if (response.data.message === 'Verification success. You can now create a password.') {
        setIsOtpVerified(true);
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP');
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/vendor/resendOTP', { email });
      if (response.data.success) {
        alert('OTP has been resent to your email');
      } else {
        alert('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Error resending OTP');
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    try {
      const response = await axios.post('http://localhost:8000/vendor/forgate', { email, newPassword });
      console.log('Password Reset Response:', response.data); // Log response
      if (response.data.success) {
        alert(response.data.message); 
        navigate('/login'); // Navigate to login page
      } 
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password');
    }
  };
  

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <CForm className="text-center">
                    <img
                      src={logo1}
                      alt="Logo"
                      className="mb-4"
                      style={{ width: '350px' }}
                    />
                    <h3 style={{ marginBottom: '20px' }}>
                      Change Your Password!
                    </h3>

                    {/* Email input */}
                    <CInputGroup className="mb-4">
                      <CFormInput
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>

                    {/* OTP input section */}
                    <div className="d-flex justify-content-center mb-4">
                      {otp.map((digit, index) => (
                        <CFormInput
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="otp-input mx-2 text-center"
                          style={{ width: '50px', fontSize: '24px' }}
                        />
                      ))}

                      {isOtpVerified ? (
                        <CIcon icon={cilCheckCircle} size="lg" className="ml-4" style={{ color: 'green' }} />
                      ) : (
                        <CButton color="warning" className="ml-2" onClick={verifyOtp}>
                          Verify OTP
                        </CButton>
                      )}
                    </div>

                    {isOtpVerified && (
                      <>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Enter New Password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </CInputGroup>

                        {/* Centered Change button */}
                        <CButton color="warning" className="px-4 mb-3" onClick={handlePasswordChange}>
                          Submit
                        </CButton>
                      </>
                    )}

                    {/* Line and Resend OTP link */}
                    <div className="my-3">
                      <Link to="#" onClick={resendOtp}>Resend OTP</Link> {/* Trigger resendOtp on click */}
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Change;
