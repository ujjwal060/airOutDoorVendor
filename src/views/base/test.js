import React, { useState, useRef } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '',
    category: '',
    description: '',
    priceMin: '',
    priceMax: '',
    address: '',
    state: '',
    city: '',
    postalCode: '',
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProperty, setViewProperty] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const address = place.formatted_address;
      const components = place.address_components;

      const addressObj = {
        address,
        state: components.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "",
        city: components.find(c => c.types.includes("locality"))?.long_name || "",
        postalCode: components.find(c => c.types.includes("postal_code"))?.long_name || ""
      };

      setNewProperty(prev => ({ ...prev, ...addressObj }));
      autocompleteRef.current = null; // Clear the reference after selection
    } else {
      console.error("Autocomplete is not loaded yet.");
    }
  };

  const handleAddProperty = () => {
    const { name, category, description, priceMin, priceMax, address, state, city, postalCode } = newProperty;
    if (name && category && description && priceMin && priceMax && address && state && city && postalCode) {
      if (parseFloat(priceMin) > parseFloat(priceMax)) {
        alert("Minimum price should not exceed maximum price.");
        return;
      }
      setProperties((prev) => [
        ...prev,
        { ...newProperty, priceRange: `${priceMin} - ${priceMax}` },
      ]);
      setNewProperty({
        name: '',
        category: '',
        description: '',
        priceMin: '',
        priceMax: '',
        address: '',
        state: '',
        city: '',
        postalCode: '',
      });
      setShowAddModal(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h3>Property Management</h3>
            <CButton color="primary" onClick={() => setShowAddModal(true)}>
              Add Property
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Serial No</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {properties.map((property, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{property.name}</CTableDataCell>
                    <CTableDataCell>{property.category}</CTableDataCell>
                    <CTableDataCell>{property.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" className="me-1">
                        <i className="fas fa-eye"></i>
                      </CButton>
                      <CButton color="warning" size="sm" className="me-1">
                        <i className="fas fa-edit"></i>
                      </CButton>
                      <CButton color="danger" size="sm">
                        <i className="fas fa-trash-alt"></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal for Adding Property */}
      <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Add Property</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                name="name"
                placeholder="Property Name"
                value={newProperty.name}
                onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="category"
                placeholder="Category"
                value={newProperty.category}
                onChange={(e) => setNewProperty(prev => ({ ...prev, category: e.target.value }))}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormTextarea
                name="description"
                placeholder="Description"
                value={newProperty.description}
                onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="number"
                name="priceMin"
                placeholder="Minimum Price"
                value={newProperty.priceMin}
                onChange={(e) => setNewProperty(prev => ({ ...prev, priceMin: e.target.value }))}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="priceMax"
                placeholder="Maximum Price"
                value={newProperty.priceMax}
                onChange={(e) => setNewProperty(prev => ({ ...prev, priceMax: e.target.value }))}
              />
            </CCol>
          </CRow>

          {/* Google Maps Autocomplete Location */}
          <LoadScript googleMapsApiKey="AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s" libraries={['places']}>
            <h5>Location</h5>
            <Autocomplete onLoad={ref => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
              <CFormInput
                type="text"
                placeholder="Enter address"
                value={newProperty.address}
                onChange={(e) => setNewProperty(prev => ({ ...prev, address: e.target.value }))}
              />
            </Autocomplete>
          </LoadScript>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddProperty}>
            Add Property
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PropertyManagement;
