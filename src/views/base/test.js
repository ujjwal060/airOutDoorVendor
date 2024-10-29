import React, { useState } from 'react';
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
  CModalFooter
} from '@coreui/react';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '',
    category: '',
    description: '',
    priceMin: '',
    priceMax: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [viewProperty, setViewProperty] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProperty = () => {
    const { name, category, description, priceMin, priceMax } = newProperty;
    if (name && category && description && priceMin && priceMax) {
      setProperties((prev) => [
        ...prev,
        { ...newProperty, priceRange: `${priceMin} - ${priceMax}` }
      ]);
      setNewProperty({ name: '', category: '', description: '', priceMin: '', priceMax: '' }); // Reset form
      setShowModal(false); // Close the modal after adding
    } else {
      alert('Please fill in all fields.'); // Simple validation alert
    }
  };

  const handleDeleteProperty = (index) => {
    const updatedProperties = properties.filter((_, i) => i !== index);
    setProperties(updatedProperties);
  };

  const handleViewProperty = (property) => {
    setViewProperty(property);
    setShowModal(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h3>Property Management</h3>
            <CButton color="primary" onClick={() => setShowModal(true)}>
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
                  <CTableHeaderCell>Price Range</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {properties.map((property, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell> {/* Automatic serial number */}
                    <CTableDataCell>{property.name}</CTableDataCell>
                    <CTableDataCell>{property.category}</CTableDataCell>
                    <CTableDataCell>{property.description}</CTableDataCell>
                    <CTableDataCell>{property.priceRange}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleViewProperty(property)}>
                        See
                      </CButton>
                      <CButton color="warning" className="mx-2">
                        Update
                      </CButton>
                      <CButton color="danger" onClick={() => handleDeleteProperty(index)}>
                        Delete
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
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>{newProperty.name ? "Update Property" : "Add Property"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                name="name"
                placeholder="Property Name"
                value={newProperty.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="category"
                placeholder="Category"
                value={newProperty.category}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormTextarea
                name="description"
                placeholder="Description"
                value={newProperty.description}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                name="priceMax"
                placeholder="Maximum Price"
                value={newProperty.priceMax}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddProperty}>
            {newProperty.name ? "Update Property" : "Add Property"}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for Viewing Property Details */}
      <CModal visible={!!viewProperty} onClose={() => setViewProperty(null)}>
        <CModalHeader closeButton>
          <CModalTitle>Property Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {viewProperty && (
            <div>
              <p><strong>Name:</strong> {viewProperty.name}</p>
              <p><strong>Category:</strong> {viewProperty.category}</p>
              <p><strong>Description:</strong> {viewProperty.description}</p>
              <p><strong>Price Range:</strong> {viewProperty.priceRange}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewProperty(null)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PropertyManagement;
