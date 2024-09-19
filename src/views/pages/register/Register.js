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
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo1 from './img/logo1.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    profileImage: null,
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState(''); // State for storing error messages

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      name: formData.username,
      email: formData.email,
      phone: formData.mobile,
      address: formData.address,
      password: formData.password,
      profileImage: formData.profileImage, // Send profile image as part of the object
    };

    try {
      const response = await axios.post('http://localhost:8000/vendor/signup', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      alert("Registration successful");

      // Navigate to approval page
      navigate('/approval');
    } catch (error) {
      // Extract error message from the response
      const errorMessage = error.response?.data?.message || "Registration failed";
      setError(errorMessage); // Set the error message to state
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <CContainer style={{ margin: "20px" }}>
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

                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      value={formData.email}
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
                      value={formData.mobile}
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
                      value={formData.address}
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
                      name="profileImage"
                      type="file"
                      onChange={handleChange}
                      placeholder="Upload Profile Image"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      value={formData.password}
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
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <div className="b-grid">
                    <CButton color="warning" style={{ color: "white" }} type="submit">
                      Create Account
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
