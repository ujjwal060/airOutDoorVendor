import React, { useState } from 'react';
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
import profile from './img/profile.webp'; // Default profile image

const Profile = () => {
    // State for storing personal information
    const [userInfo, setUserInfo] = useState({
        fullName: 'Sumit Kumar Singh',
        email: 'sumit.singh@aayaninfotech.com',
        phone: '9198701590',
        address: 'Incugus Lucknow'
    });

    // State for profile image
    const [profileImage, setProfileImage] = useState(profile);

    // State to manage modal visibility and editable fields
    const [ModalVisible1, setModalVisible1] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);
    const [editInfo, setEditInfo] = useState(userInfo);
    const [file, setFile] = useState(null);

    // Function to handle input changes in the modal
    const handleModalChange = (event) => {
        const { name, value } = event.target;
        setEditInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Function to handle file input change
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    // Function to handle save changes
    const handleSaveChanges = () => {
        setUserInfo(editInfo);
        if (file) {
            setProfileImage(file);
        }
        setModalVisible1(false);
        setModalVisible(false);
    };

    return (
        <>
            <CRow className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <img
                    style={{ width: "450px" }}
                    src={logo1}
                    alt="Logo"
                />
            </CRow>
            
            <CRow>
                {/* Left side card for profile picture and user information */}
                <CCol md={4}>
                    <CCard>
                        <CCardBody className="text-center">
                            <img
                                src={profileImage}
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

                {/* Right side card for personal information */}
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
                                    {/* Column for Labels */}
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

                                    {/* Column for Displaying User Info */}
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
                                    <CFormInput
                                        type="file"
                                        id="profileImage"
                                        onChange={handleFileChange}
                                    />
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
            

            {/*Modal for Editing Personal Information */}

            <CModal visible={ModalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Update Password</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol md={12}>                                                                                                                              
                                <div className="mb-3">
                                    <label htmlFor="password">Old Password</label>
                                    <CFormInput
                                        type="text"
                                        id="old password"
                                        name="Old Password"
                                        value={editInfo.oldpassword}
                                        onChange={handleModalChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">New Password</label>
                                    <CFormInput
                                        type="text"
                                        id="new password"
                                        name="new Password"
                                        value={editInfo.newpassword}
                                        onChange={handleModalChange}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={handleSaveChanges}>Save</CButton>
                </CModalFooter>
            </CModal>

        </>
    );
};

export default Profile;
