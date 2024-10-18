import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
} from "@coreui/react";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PropertyTable = () => {
  const [properties, setProperties] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can customize this number
  const [modalVisible, setModalVisible] = useState(false);
  const [newProperty, setNewProperty] = useState({
    propertyNickname: "",
    category: "",
    propertyDescription: "",
    priceRange: { min: "", max: "" },
    guestLimitPerDay: "",
    location: { city: "", state: "" },
    instantBooking: false,
  });

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://44.196.192.232:8000/host/getProperty");
        setProperties(response.data.data || []); // Ensure properties is always an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal toggle
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (modalVisible) {
      // Reset newProperty state when closing modal
      setNewProperty({
        propertyNickname: "",
        category: "",
        propertyDescription: "",
        priceRange: { min: "", max: "" },
        guestLimitPerDay: "",
        location: { city: "", state: "" },
        instantBooking: false,
      });
    }
  };

  // Handle input changes for new property
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("priceRange")) {
      setNewProperty((prevState) => ({
        ...prevState,
        priceRange: {
          ...prevState.priceRange,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("location")) {
      setNewProperty((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setNewProperty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle adding new property
  const handleAddProperty = async () => {
    try {
      await axios.post("http://44.196.192.232:8000/host/add", newProperty);

      // Fetch properties again after adding a new property
      const response = await axios.get("http://44.196.192.232:8000/host/getProperty");
      setProperties(response.data.data || []);
      toggleModal(); // Close modal
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <CRow className="align-items-center mb-3">
        <CCol>
          <h4>Property Management</h4>
        </CCol>
        <CCol className="text-end">
          <CButton color="warning" onClick={toggleModal}>
            Add Property
          </CButton>
        </CCol>
      </CRow>

      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Property Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price Range</CTableHeaderCell>
            <CTableHeaderCell scope="col">Guest Limit</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Booking Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentItems.length > 0 ? (
            currentItems.map((property, index) => (
              <CTableRow key={property._id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{property.propertyNickname}</CTableDataCell>
                <CTableDataCell>{property.category}</CTableDataCell>
                <CTableDataCell>{property.propertyDescription}</CTableDataCell>
                <CTableDataCell>
                  {property.priceRange ? `$${property.priceRange.min} - $${property.priceRange.max}` : "N/A"}
                </CTableDataCell>
                <CTableDataCell>{property.guestLimitPerDay}</CTableDataCell>
                <CTableDataCell>
                  {property.location.city}, {property.location.state}
                </CTableDataCell>
                <CTableDataCell>{property.instantBooking ? "Instant" : "Manual"}</CTableDataCell>
                <CTableDataCell>
                  <button className="btn btn-link" onClick={() => handleEdit(property._id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-link text-danger" onClick={() => handleDelete(property._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="9">No properties found.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      {/* Pagination Component */}
      {properties.length > 0 && (
        <CPagination aria-label="Page navigation" style={{display:"flex", justifyContent:'center'}}>
          <CPaginationItem
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </CPaginationItem>
          {Array.from({
            length: Math.ceil(properties.length / itemsPerPage),
          }).map((_, index) => (
            <CPaginationItem
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(properties.length / itemsPerPage)}
          >
            &raquo;
          </CPaginationItem>
        </CPagination>
      )}

      {/* Modal for Adding Property */}
      <CModal visible={modalVisible} onClose={toggleModal}>
        <CModalHeader closeButton>
          <CModalTitle>Add New Property</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="propertyNickname">Property Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="propertyNickname"
                  name="propertyNickname"
                  value={newProperty.propertyNickname}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="category"
                  name="category"
                  value={newProperty.category}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="propertyDescription">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="propertyDescription"
                  name="propertyDescription"
                  value={newProperty.propertyDescription}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="min">Min Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="min"
                  name="min"
                  placeholder="Min"
                  value={newProperty.priceRange.min}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="max">Max Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="max"
                  name="max"
                  placeholder="Max"
                  value={newProperty.priceRange.max}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="guestLimitPerDay">Guest Limit</CFormLabel>
                <CFormInput
                  type="number"
                  id="guestLimitPerDay"
                  name="guestLimitPerDay"
                  value={newProperty.guestLimitPerDay}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="city">City</CFormLabel>
                <CFormInput
                  type="text"
                  id="city"
                  name="location.city"
                  value={newProperty.location.city}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="state">State</CFormLabel>
                <CFormInput
                  type="text"
                  id="state"
                  name="location.state"
                  value={newProperty.location.state}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <input
                  type="checkbox"
                  id="instantBooking"
                  name="instantBooking"
                  checked={newProperty.instantBooking}
                  onChange={(e) => setNewProperty((prevState) => ({
                    ...prevState,
                    instantBooking: e.target.checked,
                  }))}
                />
                <CFormLabel htmlFor="instantBooking" style={{marginLeft:"5px"}}>Instant Booking</CFormLabel>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>

          <CButton color="warning" onClick={handleAddProperty}>
            Add Property
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PropertyTable;
