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
    CPaginationItem
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

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
        availability: 'No',
        startDate: null,
        endDate: null,
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
        const files = Array.from(e.target.files);
        setNewProperty((prev) => ({ ...prev, images: files }));
        // setNewProperty((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // Handle start date and end date changes
    const handleStartDateChange = (date) => {
        setNewProperty((prev) => ({ ...prev, startDate: date }));
    };

    const handleEndDateChange = (date) => {
        setNewProperty((prev) => ({ ...prev, endDate: date }));
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

        if (newProperty.images && newProperty.images.length > 0) {
            newProperty.images.forEach((image, index) => {
                formData.append('images', image);
            });
        }

        const vendorId = localStorage.getItem('vendorId');
        if (!vendorId) {
            toast.error('Vendor ID not found in local storage');
            return;
        }
        formData.append('vendorId', vendorId);

        try {
            if (editMode) {
                await axios.put(`http://localhost:8000/property/update/${selectedPropertyId}`, formData);
                toast.success('Property updated successfully');
            } else {
                await axios.post('http://localhost:8000/property/post', formData);
                toast.success('Property added successfully');
            }

            fetchProperties();
        } catch (error) {
            console.error('Error adding/updating property:', error);
            toast.error(error.response?.data?.message || 'Error adding/updating property');
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
            availability: 'No',
            startDate: null,
            endDate: null,
            category: '',
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
            startDate: property.startDate ? new Date(property.startDate) : null,
            endDate: property.endDate ? new Date(property.endDate) : null,
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
                                        {/* <CTableHeaderCell>Availability</CTableHeaderCell> */}
                                        <CTableHeaderCell>Start Date</CTableHeaderCell>
                                        <CTableHeaderCell>End Date</CTableHeaderCell>
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
                                                <img src={property.imageUrl[0]} alt={property.name} width="50" />
                                            </CTableDataCell>
                                            <CTableDataCell>{property.name}</CTableDataCell>
                                            <CTableDataCell>{property.category}</CTableDataCell>
                                            <CTableDataCell>{property.description}</CTableDataCell>
                                            <CTableDataCell>{property.amenities}</CTableDataCell>
                                            <CTableDataCell>{property.pricing}</CTableDataCell>
                                            {/* <CTableDataCell>{property.availability}</CTableDataCell> */}
                                            <CTableDataCell>
                                                {new Date(property.startDate).toLocaleDateString()}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {new Date(property.endDate).toLocaleDateString()}
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

            <CPagination
                aria-label="Page navigation example"
                className="mt-3"
                align="center"
                size="sm"
            >

                <CPaginationItem
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    &laquo;
                </CPaginationItem>


                {[...Array(Math.ceil(properties.length / itemsPerPage))].map((_, idx) => (
                    <CPaginationItem
                        key={idx}
                        active={currentPage === idx + 1}
                        onClick={() => paginate(idx + 1)}
                    >
                        {idx + 1}
                    </CPaginationItem>
                ))}


                <CPaginationItem
                    disabled={currentPage === Math.ceil(properties.length / itemsPerPage)}
                    onClick={() => paginate(currentPage + 1)}
                >
                    &raquo;
                </CPaginationItem>
            </CPagination>


            <CModal visible={modalVisible} onClose={closeModal}>
                <CModalHeader>{editMode ? 'Edit Property' : 'Add Property'}</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel >Property Name</CFormLabel>
                        <CFormInput className="mb-3"
                            type="text"
                            name="name"
                            value={newProperty.name}
                            onChange={handleInputChange}
                        />

                        <CFormLabel>Description</CFormLabel>
                        <CFormTextarea className="mb-3"
                            name="description"
                            value={newProperty.description}
                            onChange={handleInputChange}
                        />

                        <CFormLabel>Amenities</CFormLabel>
                        <CFormTextarea className="mb-3"
                            name="amenities"
                            value={newProperty.amenities}
                            onChange={handleInputChange}
                        />

                        <CFormLabel>Pricing</CFormLabel>
                        <CFormInput className="mb-3"
                            type="text"
                            name="pricing"
                            value={newProperty.pricing}
                            onChange={handleInputChange}
                        />

                        <CFormLabel>Availability</CFormLabel>
                        <CFormSelect className="mb-3"
                            name="availability"
                            value={newProperty.availability}
                            onChange={handleInputChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </CFormSelect>

                        <CRow className="mb-3">
                            <CCol md={6}>
                                <CFormLabel>Start Date</CFormLabel>
                                <DatePicker
                                    selected={newProperty.startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel>End Date</CFormLabel>
                                <DatePicker
                                    selected={newProperty.endDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                />
                            </CCol>
                        </CRow>


                        <CFormLabel>Category</CFormLabel>
                        <CFormSelect className="mb-3"
                            name="category"
                            value={newProperty.category}
                            onChange={handleInputChange}
                        >
                            <option>Select Category</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                        </CFormSelect>

                        <CFormLabel>Image</CFormLabel>
                        <CFormInput className="mb-3"
                            type="file"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                        Close
                    </CButton>
                    <CButton color="warning" onClick={addOrUpdateProperty}>
                        {editMode ? 'Update Property' : 'Add Property'}
                    </CButton>
                </CModalFooter>
            </CModal>
            <ToastContainer />
        </>
    );
};

export default Tables;
