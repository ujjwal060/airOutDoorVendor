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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch property data from backend
    useEffect(() => {
        fetchProperties();
    }, []);

    // Logic to calculate the current properties to display
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Automatically add $ sign to pricing
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
            const response = await axios.get('http://localhost:8000/property/get');
            setProperties(response.data);
            console.log("111", response.data.image);
            
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };


    // Function to handle adding or updating a property
    const addOrUpdateProperty = async () => {
        const formData = new FormData();
        Object.keys(newProperty).forEach((key) => {
            formData.append(key, newProperty[key]);
        });

        try {
            if (editMode) {
                // Update the existing property
                const response = await axios.put(`http://localhost:8000/property/update/${selectedPropertyId}`, formData);

                // Update the state with the modified property
                setProperties(
                    properties.map((property) =>
                        property._id === selectedPropertyId
                            ? { ...property, ...response.data }  // Use _id to match with the backend
                            : property
                    )
                );
            } else {
                // Add a new property
                const response = await axios.post('http://localhost:8000/property/post', formData);
                setProperties([...properties, response.data]);
            }
        } catch (error) {
            console.error('Error adding/updating property:', error);
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
            setProperties(properties.filter((property) => property._id !== id)); // Use _id here
        } catch (error) {
            console.error('Error deleting property:', error);
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
        setSelectedPropertyId(property._id); // Use _id here
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
                                        <CTableHeaderCell>#</CTableHeaderCell>
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
                                            <img src={`http://localhost:8000/${property.image}`} alt={property.name} width="50" />
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
                        <CFormInput
                            type="file"
                            label="Property Image"
                            name="image"
                            onChange={handleFileChange}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>Cancel</CButton>
                    <CButton color="warning" onClick={addOrUpdateProperty}>
                        {editMode ? 'Update' : 'Add'}
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Pagination */}
            <CPagination aria-label="Page navigation example" style={{display:"flex",justifyContent:"center"}}>
                <CPaginationItem
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </CPaginationItem>
                {Array.from({ length: Math.ceil(properties.length / itemsPerPage) }, (_, index) => (
                    <CPaginationItem
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </CPaginationItem>
                ))}
                <CPaginationItem
                    disabled={currentPage === Math.ceil(properties.length / itemsPerPage)}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </CPaginationItem>
            </CPagination>
        </>
    );
};

export default Tables;
