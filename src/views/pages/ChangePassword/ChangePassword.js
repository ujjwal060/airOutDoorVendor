import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo1 from './img/logo1.png';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { cilLockLocked, cilCheckCircle } from '@coreui/icons';

const Change = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  const email = location.state?.email || localStorage.getItem('email');

  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    }
  }, [email]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < otp.length - 1 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const otpString = otp.join('');
      const response = await axios.post('http://localhost:8000/vendor/verifyOTP', { email, otp: otpString });
        toast.success('OTP verified successfully!');
        setIsOtpVerified(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/vendor/sendOTP', { email });
        toast.success('OTP has been resent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post('http://localhost:8000/vendor/forgate', { email, newPassword });
        toast.success('Password has been reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000)
    } catch (error) {
      toast.error(error.response?.data?.message);
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

                    <div className="d-flex justify-content-center mb-4">
                      {otp.map((digit, index) => (
                        <CFormInput
                          key={index}
                          id={`otp-input-${index}`}
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

                        <CButton color="warning" className="px-4 mb-3" onClick={handlePasswordChange}>
                          Submit
                        </CButton>
                      </>
                    )}

                    <div className="my-3">
                      <Link to="#" onClick={resendOtp}>Resend OTP</Link>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  );
};

export default Change;
