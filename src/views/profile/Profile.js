import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPen } from '@coreui/icons';
import logo1 from './img/logo1.png';
import profilePlaceholder from './img/profile.webp'; // Default profile image

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        profileImage: profilePlaceholder
    });

    const [editInfo, setEditInfo] = useState(userInfo);
    const [file, setFile] = useState(null);
    const [ModalVisible1, setModalVisible1] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);

    // Fetch vendorId from local storage (or context if you're using one)
    const vendorId = localStorage.getItem('vendorId');

    useEffect(() => {
        if (vendorId) {
            // Fetch vendor data based on vendorId
            axios.get(`http://44.196.192.232:8000/vendor/vendor/${vendorId}`)
                .then((response) => {
                    const vendorData = response.data;
                    setUserInfo({
                        fullName: vendorData.name,
                        email: vendorData.email,
                        phone: vendorData.phone,
                        address: vendorData.address,
                        profileImage: vendorData.profileImage || profilePlaceholder
                    });
                    setEditInfo({
                        fullName: vendorData.name,
                        email: vendorData.email,
                        phone: vendorData.phone,
                        address: vendorData.address
                    });
                })
                .catch((error) => {
                    console.error('Error fetching vendor data:', error);
                });
        }
    }, [vendorId]);

    const handleModalChange = (event) => {
        const { name, value } = event.target;
        setEditInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    const handleSaveChanges = () => {
        const updatedInfo = { ...editInfo };
        if (file) {
            updatedInfo.profileImage = file;
        }
    
        // Get the token from local storage (or wherever you store it)
        const token = localStorage.getItem('authToken'); // Change 'authToken' to your actual token key
    
        // Make an API call to update the information
        axios.put(`http://44.196.192.232:8000/vendor/profile/${vendorId}`, updatedInfo, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        })
            .then((response) => {
                console.log('Profile updated successfully:', response.data);
                setUserInfo(updatedInfo); // Update userInfo with the new data
                setModalVisible1(false);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };
    
    return (
        <>
            <CRow className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <img style={{ width: "450px" }} src={logo1} alt="Logo" />
            </CRow>

            <CRow>
                <CCol md={4}>
                    <CCard>
                        <CCardBody className="text-center">
                            <img
                                src={userInfo.profileImage}
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <h4>Hello</h4>
                            <p>{userInfo.fullName}</p>
                            <p>{userInfo.email}</p>
                            <div className="justify-content-center">
                                <div>Member since September</div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol md={7}>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <span>Personal Information</span>
                            <CButton color="warning" onClick={() => setModalVisible1(true)}>
                                Edit <CIcon icon={cilPen} />
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CRow>
                                    <CCol md={4}>
                                        <div className="mb-3">
                                            <label>Name :</label>
                                        </div>
                                        <div className="mb-3">
                                            <label>Email :</label>
                                        </div>
                                        <div className="mb-3">
                                            <label>Phone No :</label>
                                        </div>
                                        <div className="mb-3">
                                            <label>Address :</label>
                                        </div>
                                        <CButton color="warning" onClick={() => setModalVisible(true)}>
                                            Edit Password <CIcon icon={cilPen} />
                                        </CButton>
                                    </CCol>

                                    <CCol md={8}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div>{userInfo.fullName}</div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div>{userInfo.email}</div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div>{userInfo.phone}</div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div>{userInfo.address}</div>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Modal for Editing Personal Information */}
            <CModal visible={ModalVisible1} onClose={() => setModalVisible1(false)}>
                <CModalHeader>Update Personal Information</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol md={12}>
                                <div className="mb-3">
                                    <label htmlFor="profileImage">Profile Image</label>
                                    <CFormInput type="file" id="profileImage" onChange={handleFileChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullName">Name</label>
                                    <CFormInput
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={editInfo.fullName}
                                        onChange={handleModalChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <CFormInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editInfo.email}
                                        onChange={handleModalChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone">Phone No</label>
                                    <CFormInput
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={editInfo.phone}
                                        onChange={handleModalChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <CFormInput
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={editInfo.address}
                                        onChange={handleModalChange}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible1(false)}>Cancel</CButton>
                    <CButton color="warning" onClick={handleSaveChanges}>Save</CButton>
                </CModalFooter>
            </CModal>

            {/* Modal for Editing Password */}
            <CModal visible={ModalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Update Password</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol md={12}>
                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <CFormInput type="password" id="password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <CFormInput type="password" id="confirmPassword" />
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
                    <CButton color="warning">Save</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default Profile;
