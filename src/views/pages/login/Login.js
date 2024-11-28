import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from './img/logo1.png';
import { ToastContainer, toast } from 'react-toastify';
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
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post('http://44.196.64.110:8000/vendor/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('vendorId', response.data.vendor.id);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      if (err.response?.data?.isApproved === false) {
        toast.error('Vendor is not approved yet. Please wait for approval.');
        setTimeout(() => {
          navigate('/approval');
        }, 2000);
      } else {
        toast.error(errorMessage);
      }
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
                  <CForm onSubmit={handleLogin} className="text-center">
                    <img
                      src={logo1}
                      alt="Logo"
                      className="mb-4"
                      style={{ width: '350px' }}
                    />
                    <h3>Welcome to Air Outdoors</h3>
                    <p className="text-body-secondary">Sign In to your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>

                    {/* Login button with proper action */}
                    <CButton type="submit" color="warning" className="px-4 mb-3">
                      Login
                    </CButton>

                    {/* Line and sign-up link */}
                    <div className="my-3">
                      <span>
                        Don't have an account?{' '}
                        <Link to="/register">Sign up</Link>
                      </span>
                    </div>

                    {/* Forgot password link */}
                    <CButton color="link" className="px-0">
                      <Link to="/forgot">Forgot password?</Link>
                    </CButton>
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

export default Login;
