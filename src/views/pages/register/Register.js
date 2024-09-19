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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    profileImage: null,
    password: '',
    repeatPassword: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      name: formData.username,
      email: formData.email,
      phone: formData.mobile,
      address: formData.address,
      password: formData.password,
      profileImage: formData.profileImage,
    };

    try {
      const response = await axios.post('http://3.111.163.2:8000/vendor/signup', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success("Registration successful");
      navigate('/approval');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
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

      <ToastContainer />
    </div>
  );
};

export default Register;
