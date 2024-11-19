import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [availableDateRange, setAvailableDateRange] = useState({ start: '', end: '' });

  const [currentProperty, setCurrentProperty] = useState({
    propery_nickname: '',
    category: '',
    property_description: '',
    priceRange: { min: '', max: '' },
    location: { address: '', city: '', state: '', zip_code: '' },
    instant_booking: '',
    details: {
      acreage: '',
      guided_hunt: '',
      guest_limit: '',
      lodging: '',
      shooting_range: '',
      extended_details: '',
    },
    pricePerGroupSize: [{ groupSize: '', price: '' }],
    cancellationPolicy: '',
  });

  return (
    <div>
      <CCard>

        <CCardHeader>
          Property Management
          <CButton color="warning" onClick={handleAddProperty} style={{ float: 'right' }}>
            Add Property
          </CButton>
        </CCardHeader>
        {/* Add/Edit Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle>{currentProperty._id ? 'Edit Property' : 'Add Property'}</CModalTitle>
          </CModalHeader>


          <CModalBody>
            <div className="row">
              {/* Form Inputs */}
              <div className="col-md-6">
                <CFormInput
                  label="Name"
                  value={currentProperty.propery_nickname}
                  onChange={(e) => setCurrentProperty({ ...currentProperty, propery_nickname: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Category"
                  value={currentProperty.category}
                  onChange={(e) => setCurrentProperty({ ...currentProperty, category: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="description"
                  value={currentProperty.property_description}
                  onChange={(e) => setCurrentProperty({ ...currentProperty, property_description: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Instant Booking"
                  value={currentProperty.instant_booking}
                  onChange={(e) => setCurrentProperty({ ...currentProperty, instant_booking: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Min Price"
                  value={currentProperty.priceRange.min}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    priceRange: { ...currentProperty.priceRange, min: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Max Price"
                  value={currentProperty.priceRange.max}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    priceRange: { ...currentProperty.priceRange, max: e.target.value }
                  })}
                />
              </div>

              <div className="col-md-6">
                <CFormInput
                  label="Guest Limit Per Day"
                  value={currentProperty.details?.guest_limit}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, guest_limit: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Guest Price Per Day"
                  value={currentProperty.details?.guestPricePerDay}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, guestPricePerDay: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Cancellation Policy"
                  value={currentProperty.details?.cancellationPolicy}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, cancellationPolicy: e.target.value }
                  })}
                />
              </div>

              {/* Group Size and Price Input Fields */}
              <div className="col-md-12">
                <h5>Price Per Group Size</h5>
                {currentProperty.pricePerGroupSize.map((group, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-6">
                      <CFormInput
                        label={`Group Size ${index + 1}`}
                        value={group.groupSize}
                        onChange={(e) => {
                          const updatedGroups = [...currentProperty.pricePerGroupSize];
                          updatedGroups[index].groupSize = e.target.value;
                          setCurrentProperty({ ...currentProperty, pricePerGroupSize: updatedGroups });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <CFormInput
                        label={`Price ${index + 1}`}
                        value={group.price}
                        onChange={(e) => {
                          const updatedGroups = [...currentProperty.pricePerGroupSize];
                          updatedGroups[index].price = e.target.value;
                          setCurrentProperty({ ...currentProperty, pricePerGroupSize: updatedGroups });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Inputs */}
            <hr />
            <h5>Location</h5>
            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Address"
                  value={currentProperty.location?.address}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    location: { ...currentProperty.location, address: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="City"
                  value={currentProperty.location?.city}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    location: { ...currentProperty.location, city: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="State"
                  value={currentProperty.location?.state}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    location: { ...currentProperty.location, state: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Postal Code"
                  value={currentProperty.location?.postalCode}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    location: { ...currentProperty.location, postalCode: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Details Section */}
            <hr />
            <h5>Details</h5>
            <div className="row">
              <div className="col-md-4">
                <CFormInput
                  label="Acreage"
                  value={currentProperty.details?.acreage}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, acreage: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-4">
                <CFormInput
                  label="Guided Hunt"
                  value={currentProperty.details?.guided_hunt}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, guided_hunt: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-4">
                <CFormInput
                  label="Guest Limit"
                  value={currentProperty.details?.guest_limit}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, guest_limit: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-4">
                <CFormInput
                  label="lodging"
                  value={currentProperty.details?.lodging}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, lodging: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-4">
                <CFormInput
                  label="Shooting Range"
                  value={currentProperty.details?.shooting_range}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, shooting_range: e.target.value }
                  })}
                />
              </div>
              <div className="col-md-4">
                <CFormInput
                  label="Optional Extended Details"
                  value={currentProperty.details?.extended_details}
                  onChange={(e) => setCurrentProperty({
                    ...currentProperty,
                    details: { ...currentProperty.details, extended_details: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Available Dates Section */}
            <hr />
            <h5>Available Dates</h5>
            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  type="date"
                  label="From"
                  value={availableDateRange.from}
                  onChange={(e) => setAvailableDateRange({ ...availableDateRange, from: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="date"
                  label="To"
                  value={availableDateRange.to}
                  onChange={(e) => setAvailableDateRange({ ...availableDateRange, to: e.target.value })}
                />
              </div>
            </div>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
            <CButton color="warning" onClick={handleSave}>
              Save Changes
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    </div>
  );
};

export default PropertyManagement;
