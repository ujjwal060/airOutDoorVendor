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
    CFormSelect,
    CPagination,
    CFormLabel,
    CPaginationItem,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css'; // Date picker styling

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
        availability: null,  // Change to null for the DatePicker
        category: '',
        image: null,
    });

    const categories = [
        'Terrestrial Animals',
        'Aquatic Animals',
        'Aerial Animals',
        'Adventure Activities',
        'Special Events',
        'Other Activities'
    ];

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

    const handleDateChange = (date) => {
        setNewProperty((prev) => ({ ...prev, availability: date }));
    };

    const fetchProperties = async () => {
        try {
            const vendorId = localStorage.getItem('vendorId');
            const response = await axios.get(`http://44.196.192.232:8000/property/get/${vendorId}`);
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
                await axios.put(`http://44.196.192.232:8000/property/update/${selectedPropertyId}`, formData);
                toast.success('Property updated successfully');
            } else {
                await axios.post('http://44.196.192.232:8000/property/post', formData);
                toast.success('Property added successfully');
            }
    
            // Refetch the properties to reflect the changes
            fetchProperties();
    
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
            availability: null,
            category: '',
            image: null,
        });
    };

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`http://44.196.192.232:8000/property/delete/${id}`);
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
            availability: new Date(property.availability), // Convert string to Date object
            category: property.category,
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
                                        <CTableHeaderCell>Category</CTableHeaderCell>
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
                                                {indexOfFirstProperty + index + 1}
                                            </CTableHeaderCell>
                                            <CTableDataCell>
                                                <img src={property.imageUrl} alt={property.name} width="50" />
                                            </CTableDataCell>
                                            <CTableDataCell>{property.name}</CTableDataCell>
                                            <CTableDataCell>{property.category}</CTableDataCell>
                                            <CTableDataCell>{property.description}</CTableDataCell>
                                            <CTableDataCell>{property.amenities}</CTableDataCell>
                                            <CTableDataCell>{property.pricing}</CTableDataCell>
                                            <CTableDataCell>
                                                {new Date(property.availability).toLocaleString()}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    onClick={() => updateProperty(property)}
                                                    style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => deleteProperty(property._id)}
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
                        <CFormInput className="mb-4"
                            label="Property Name"
                            name="name"
                            value={newProperty.name}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormSelect className="mb-4"
                            label="Category"
                            name="category"
                            value={newProperty.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </CFormSelect>
                        <CFormTextarea 
                            label="Description"
                            name="description"
                            value={newProperty.description}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormTextarea
                            label="Amenities"
                            name="amenities"
                            value={newProperty.amenities}
                            onChange={handleInputChange}
                            required
                        />
                        <CFormInput className="mb-4"
                            label="Pricing"
                            name="pricing"
                            value={newProperty.pricing}
                            onChange={handleInputChange}
                            required
                        />

                        <CRow className="mb-4">
                            <CCol xs="12">
                                <CFormLabel htmlFor="availability">Availability</CFormLabel>
                                <div className="datepicker-wrapper">
                                    <DatePicker
                                        selected={newProperty.availability}
                                        onChange={handleDateChange}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        className="form-control"
                                        id="availability"
                                    />
                                </div>
                            </CCol>
                        </CRow>

                        <CFormInput
                            type="file"
                            label="Image"
                            name="image"
                            onChange={handleFileChange}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={addOrUpdateProperty}>
                        {editMode ? 'Update Property' : 'Add Property'}
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Pagination */}
            <CPagination aria-label="Page navigation" style={{display:"flex", justifyContent:"center"}}>
                <CPaginationItem onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </CPaginationItem>
                {Array.from({ length: Math.ceil(properties.length / itemsPerPage) }).map((_, index) => (
                    <CPaginationItem
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </CPaginationItem>
                ))}
                <CPaginationItem onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(properties.length / itemsPerPage)}>
                    Next
                </CPaginationItem>
            </CPagination>

            <ToastContainer />
        </>
    );
};

export default Tables;
