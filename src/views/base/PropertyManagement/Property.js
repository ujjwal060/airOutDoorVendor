import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormTextarea,
    CPagination,
    CPaginationItem,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tables = () => {
    const [properties, setProperties] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [newProperty, setNewProperty] = useState({
        name: '',
        description: '',
        amenities: '',
        pricing: '',
        availability: '',
        image: null,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchProperties();
    }, []);

    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'pricing') {
            const updatedValue = value.startsWith('$') ? value : `$${value}`;
            setNewProperty((prev) => ({ ...prev, pricing: updatedValue }));
        } else {
            setNewProperty((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setNewProperty((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const fetchProperties = async () => {
        try {
            const vendorId = localStorage.getItem('vendorId');
            const response = await axios.get(`http://localhost:8000/property/get/${vendorId}`);
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const addOrUpdateProperty = async () => {
        const formData = new FormData();
        Object.keys(newProperty).forEach((key) => {
            formData.append(key, newProperty[key]);
        });

        const vendorId = localStorage.getItem('vendorId');
        if (vendorId) {
            formData.append('vendorId', vendorId);
        } else {
            toast.error('Vendor ID not found in local storage');
            return;
        }

        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:8000/property/update/${selectedPropertyId}`, formData);
                setProperties(
                    properties.map((property) =>
                        property._id === selectedPropertyId
                            ? { ...property, ...response.data }
                            : property
                    )
                );
                toast.success('Property updated successfully');
            } else {
                const response = await axios.post('http://localhost:8000/property/post', formData);
                setProperties([...properties, response.data]);
                toast.success('Property added successfully');
            }
        } catch (error) {
            console.error('Error adding/updating property:', error);
            const errorMessage = error.response?.data?.message || "Error adding/updating property";
            toast.error(errorMessage);
        }

        closeModal();
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditMode(false);
        setSelectedPropertyId(null);
        setNewProperty({
            name: '',
            description: '',
            amenities: '',
            pricing: '',
            availability: '',
            image: null,
        });
    };

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/property/delete/${id}`);
            setProperties(properties.filter((property) => property._id !== id));
            toast.success('Property deleted successfully');
        } catch (error) {
            toast.error('Error deleting property');
        }
    };

    const updateProperty = (property) => {
        setNewProperty({
            name: property.name,
            description: property.description,
            amenities: property.amenities,
            pricing: property.pricing,
            availability: property.availability,
            image: property.image,
        });
        setSelectedPropertyId(property._id);
        setEditMode(true);
        setModalVisible(true);
    };

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Property Management</strong>
                            <CButton color="warning" className="float-end" onClick={() => setModalVisible(true)}>
                                {editMode ? 'Edit Property' : 'Add Property'}
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead color="dark">
                                    <CTableRow>
                                        <CTableHeaderCell>S.No</CTableHeaderCell>
                                        <CTableHeaderCell>Image</CTableHeaderCell>
                                        <CTableHeaderCell>Property Name</CTableHeaderCell>
                                        <CTableHeaderCell>Description</CTableHeaderCell>
                                        <CTableHeaderCell>Amenities</CTableHeaderCell>
                                        <CTableHeaderCell>Pricing</CTableHeaderCell>
                                        <CTableHeaderCell>Availability</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {currentProperties.map((property, index) => (
                                        <CTableRow key={property._id}>
                                            <CTableHeaderCell scope="row">
                                                {indexOfFirstProperty + index + 1} {/* Automatic numbering */}
                                            </CTableHeaderCell>
                                            <CTableDataCell>
                                                <img src={property.imageUrl} alt={property.name} width="50" />
                                            </CTableDataCell>
                                            <CTableDataCell>{property.name}</CTableDataCell>
                                            <CTableDataCell>{property.description}</CTableDataCell>
                                            <CTableDataCell>{property.amenities}</CTableDataCell>
                                            <CTableDataCell>{property.pricing}</CTableDataCell>
                                            <CTableDataCell>{property.availability}</CTableDataCell>
                                            <CTableDataCell>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    onClick={() => updateProperty(property)}
                                                    style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => deleteProperty(property._id)} // Use _id here
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                />
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Modal for adding/updating a Property */}
            <CModal visible={modalVisible} onClose={closeModal}>
                <CModalHeader>{editMode ? 'Update Property' : 'Add Property'}</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            label="Property Name"
                            name="name"
                            value={newProperty.name}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormTextarea
                            label="Description"
                            name="description"
                            value={newProperty.description}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormInput
                            label="Amenities"
                            name="amenities"
                            value={newProperty.amenities}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormInput
                            label="Pricing"
                            name="pricing"
                            value={newProperty.pricing}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormInput
                            label="Availability"
                            name="availability"
                            value={newProperty.availability}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormInput type="file" onChange={handleFileChange} />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={addOrUpdateProperty}>
                        {editMode ? 'Update' : 'Add'}
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Pagination */}
            <CPagination
                aria-label="Page navigation"
                align="end"
                className="mt-3"
                size="sm"
                total={properties.length}
                currentPage={currentPage}
                onPageChange={paginate}
                pages={Math.ceil(properties.length / itemsPerPage)}
            />

            <ToastContainer />
        </>
    );
};

export default Tables;
