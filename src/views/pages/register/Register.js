import React, { useState } from 'react';
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
import { cilLockLocked, cilUser, cilImage, cilPhone, cilHome } from '@coreui/icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import logo1 from './img/logo1.png';

const Register = () => {
  const [imageFile, setImageFile] = useState(null);
  const [register, setRegister] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    repeatPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setRegister((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation for required fields
    if (!register.username || !register.email || !register.mobile || !register.address || !register.password) {
      toast.error('All fields are required');
      return;
    }
  
    // Check if passwords match
    if (register.password !== register.repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', register.username); // Ensure this matches backend field 'name'
    formData.append('email', register.email); // Ensure this matches backend field 'email'
    formData.append('phone', register.mobile); // Ensure this matches backend field 'phone'
    formData.append('address', register.address); // Ensure this matches backend field 'address'
    formData.append('password', register.password); // Ensure this matches backend field 'password'
    formData.append('images', imageFile); // Ensure this matches backend field 'profileImage'
  
    try {
      const response = await axios.post('http://44.196.192.232:8000/vendor/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Registration successful');
      navigate('/approval');
    } catch (error) {
      // Log detailed error message for troubleshooting
      if (error.response) {
        console.error('Response data:', error.response.data);  // Detailed error message from backend
        console.error('Response status:', error.response.status);  // HTTP status code
        console.error('Response headers:', error.response.headers);  // Any response headers
  
        const errorMessage = error.response.data.message || 'Registration failed due to bad request';
        toast.error(errorMessage);
      } else {
        console.error('Error:', error.message);
        toast.error('Network error or server not reachable');
      }
    }
  };
  
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <CContainer style={{ margin: '20px' }}>
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
                  <h2 className="text-center">Register with Air Outdoors</h2>
                  <p className="text-body-secondary text-center">
                    Create your account
                  </p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      value={register.username}
                      onChange={handleChange}
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      value={register.email}
                      onChange={handleChange}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      name="mobile"
                      value={register.mobile}
                      onChange={handleChange}
                      placeholder="Mobile No."
                      autoComplete="mobile"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      name="address"
                      value={register.address}
                      onChange={handleChange}
                      placeholder="Address"
                      autoComplete="address"
                    />
                  </CInputGroup>

                  {/* Profile Image Upload Field */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      name="image"
                      accept="image/*"
                      placeholder="Upload Profile Image"
                      onChange={handleImageUpload}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      value={register.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="repeatPassword"
                      type="password"
                      value={register.repeatPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <div className="b-grid">
                    <CButton color="warning" style={{ color: 'white' }} type="submit">
                      Create Account
                    </CButton>
                  </div>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <ToastContainer />
    </div>
  );
};

export default Register;
