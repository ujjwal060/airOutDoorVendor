import React, { useState, useEffect, useRef } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'

import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CRow,
  CCol,
  CFormTextarea,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import './property.css'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'

const libraries = ['places']

const PropertyManagement = () => {
  const [properties, setProperties] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [active, setIsActive] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [categoryAll, setCategoryAll] = useState([])
  const autocompleteRef = useRef(null)
  const [detailsModal, setDetailsModal] = useState(false)
  const [loadingPropertyId, setLoadingPropertyId] = useState(null)
  const [deletePropertyId, setdeletePropertyId] = useState(null)
  const [IsLoading, SetIsLoading] = useState(false)
  const fileInputRef = useRef()
  const [selectedDates, setSelectedDates] = useState([])
  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s',
    libraries,
  })
  const handleDateChange = (date) => {
    const dateString = date.toISOString() // Convert to ISO format for compatibility
    const updatedDates = [...selectedDates]
    const existingIndex = updatedDates.findIndex((d) => d === dateString)

    if (existingIndex !== -1) {
      // If the date exists, remove it
      updatedDates.splice(existingIndex, 1)
    } else {
      // If the date doesn't exist, add it
      updatedDates.push(dateString)
    }

    setSelectedDates(updatedDates)
  }

  const disabledDates = selectedDates // Use selectedDates as disabledDates for demonstration
  const isDateDisabled = (date) => {
    return disabledDates.some(
      (disabledDate) => new Date(disabledDate).toDateString() === date.toDateString(),
    )
  }

  const handleToggle = async (propertyId) => {
    const newFavoriteStatus = !favorites[propertyId]

    try {
      const res = await axios.post('http://44.196.64.110:8000/property/favorite', {
        propertyId,
        isFavorite: newFavoriteStatus,
      })
      fetchProperties()
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [propertyId]: newFavoriteStatus,
      }))
    } catch (error) {
      console.error('Error updating favorite status', error.response)
    }
  }
  const handleRemoveImage = (indexToRemove) => {
    setNewProperty((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleToggleClick = async (propertyId, isFavorite) => {
    setLoadingPropertyId(propertyId)
    await handleToggle(propertyId, isFavorite)
    setLoadingPropertyId(null)
  }
  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  // Add custom key-value pair
  const handleAddCustomField = () => {
    if (keyInput.trim() && valueInput.trim()) {
      setNewProperty((prev) => ({
        ...prev,
        customFields: [...prev.customFields, { key: keyInput, value: valueInput }],
      }))
      setKeyInput('')
      setValueInput('')
    }
  }

  const handleRemoveCustomField = (index) => {
    setNewProperty((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }))
  }

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [newProperty, setNewProperty] = useState({
    selectedDates: selectedDates,
    property_nickname: '',
    category: '',
    property_name: '',
    property_description: '',
    startDate: '',
    endDate: '',
    pricePerPersonPerDay: '',
    address: '',
    latitude: '',
    longitude: '',
    instant_booking: active,
    images: [],
    cancellation_policy: false,
    customFields: [],
  })

  const vendorId = localStorage.getItem('vendorId')
  const [favorites, setFavorites] = useState(
    properties.reduce((acc, property) => {
      acc[property._id] = property.isFavorite || false
      return acc
    }, {}),
  )
  const handleViewDetails = (property) => {
    setSelectedProperty(property)
    setDetailsModal(true)
  }

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value
    setNewProperty((prev) => ({
      ...prev,
      category: selectedCategoryId,
    }))
  }

  const getCatgory = async () => {
    try {
      const responce = await axios.post('http://44.196.64.110:8000/catogries/get')
      setCategoryAll(responce.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleStartDateChange = (date) => {
    setNewProperty((prev) => ({ ...prev, startDate: date }))
  }

  const handleEndDateChange = (date) => {
    setNewProperty((prev) => ({ ...prev, endDate: date }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setNewProperty((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: fieldValue,
        },
      }))
    } else {
      setNewProperty((prev) => ({
        ...prev,
        [name]: fieldValue,
      }))
    }
  }

  useEffect(() => {
    fetchProperties()
    getCatgory()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`http://44.196.64.110:8000/property/get/${vendorId}`)

      const result = await response.data
      console.log('result data', result)
      const formattedProperties = result.map((property) => {
        const formattedStartDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.startDate))

        const formattedEndDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(property.endDate))

        return {
          ...property,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }
      })
      setProperties(formattedProperties)
      console.log(newProperty)
    } catch (error) {
      console.error('Error fetching properties:', error)
      setProperties([])
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setNewProperty((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }))
  }

  const handleDeleteProperty = async (id) => {
    setdeletePropertyId(id)
    try {
      console.log(`Deleting property with ID: ${id}`)
      const res = await axios.delete(`http://44.196.64.110:8000/property/delete/${id}`)

      toast.success(res.data.message)
      fetchProperties()
      setdeletePropertyId(null)
      //   setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      setdeletePropertyId(null)
      toast.error('Error deleting property')
    }
  }

  const handleEditProperty = (property) => {
    console.log('Editing property:', property)

    setNewProperty({
      property_nickname: property.propertyNickname || '',
      category: property.category || '',
      property_name: property.propertyName || '',
      property_description: property.propertyDescription || '',
      pricePerPersonPerDay: property?.pricePerPersonPerDay,
      startDate: property.startDate ? new Date(property.startDate) : '',
      endDate: property.endDate ? new Date(property.endDate) : '',
      address: property.location?.address || '',
      latitude: property.location?.latitude || '',
      longitude: property.location?.longitude || '',
      instant_booking: property.instant_booking || false,
      images: property.images || [],
      customFields: property?.customFields,
      selectedDates: property?.disabledDates,
      cancellation_policy: property.cancellation_policy || false,
      _id: property._id || '',
    })

    setEditMode(true)
    setModalVisible(true)
  }

  useEffect(() => {
    console.log(newProperty)
  }, [])

  const addOrUpdateProperty = async () => {
    const propertyData = {
      vendorId,
      property_nickname: newProperty.property_nickname,
      category: newProperty.category,
      property_description: newProperty.property_description,
      instant_booking: newProperty.instant_booking,
      property_name: newProperty.property_name,
      extended_details: newProperty.extended_details,
      address: newProperty.address,
      latitude: newProperty.latitude,
      longitude: newProperty.longitude,
      checkIn: newProperty.startDate,
      checkOut: newProperty.endDate,
      pricePerPersonPerDay: newProperty.pricePerPersonPerDay,
      disabledDates: JSON.stringify(selectedDates),
      customFields: JSON.stringify(newProperty.customFields),
    }

    const formData = new FormData()

    Object.entries(propertyData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    })

    if (newProperty.images && Array.isArray(newProperty.images)) {
      newProperty.images.forEach((image) => {
        if (typeof image === 'string') {
          formData.append('existingImages', image) // Existing images as strings
        } else {
          formData.append('images', image) // New images as file objects
        }
      })
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    try {
      SetIsLoading(true)

      const isUpdate = Boolean(newProperty._id)
      const url = isUpdate
        ? `http://44.196.64.110:8000/property/update/${newProperty._id}`
        : `http://44.196.64.110:8000/property/post`
      const method = isUpdate ? 'put' : 'post'

      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setNewProperty({
        property_nickname: '',
        category: '',
        property_name: '',
        property_description: '',
        startDate: '',
        endDate: '',
        pricePerPersonPerDay: '',
        address: '',
        latitude: '',
        longitude: '',
        instant_booking: active,
        images: [],
        cancellation_policy: false,
        customFields: [],
      })

      toast.success('Property added Successfully')
      setModalVisible(false)
      fetchProperties()
    } catch (error) {
      console.error('Error adding/updating property:', error)
      alert('Failed to add/update the property. Please try again.')
    } finally {
      SetIsLoading(false)
    }
  }

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      const address = place?.formatted_address || ''
      const latitude = place?.geometry?.location?.lat()
      const longitude = place?.geometry?.location?.lng()

      setNewProperty((prev) => ({
        ...prev,
        address,
        latitude,
        longitude,
      }))
    }
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CCard>
        <CCardHeader>
          Property Management
          <CButton color="warning" onClick={() => setModalVisible(true)} style={{ float: 'right' }}>
            Add Property
          </CButton>
        </CCardHeader>
        <CCardBody>
          {properties.length > 0 ? (
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>S.No.</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Property Name</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell className="text-center ">Price Per Person/Day</CTableHeaderCell>
                  <CTableHeaderCell>Cancel Charge</CTableHeaderCell>
                  <CTableHeaderCell className="text-center ">Admin Commission</CTableHeaderCell>
                  <CTableHeaderCell>Favourite</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {properties.map((property, index) => (
                  <CTableRow key={index}>
                    {/* Index */}
                    <CTableDataCell className="text-center align-middle">
                      {index + 1}
                    </CTableDataCell>

                    {/* Image */}
                    <CTableDataCell className="text-center align-middle">
                      <img
                        src={property.images[0]}
                        alt={property?.propertyName}
                        style={{ width: '50px', height: 'auto' }}
                      />
                    </CTableDataCell>

                    {/* Property Name */}
                    <CTableDataCell className="text-center ">
                      {property?.propertyName}
                    </CTableDataCell>

                    {/* Address */}
                    <CTableDataCell className="text-start align-start">
                      {property.location.address}
                    </CTableDataCell>

                    {/* price per day per person  */}
                    <CTableDataCell className="text-center align-middle">
                      {property.pricePerPersonPerDay + ' $'}
                    </CTableDataCell>
                    <CTableDataCell className="text-start align-middle">
                      {property.cancellationCharge
                        ? property.cancellationCharge + '%'
                        : 'Not approved'}
                    </CTableDataCell>
                    <CTableDataCell className="text-center align-middle">
                      {property.adminCommission
                        ? property.adminCommission + ' %/booking'
                        : 'Not approved'}
                    </CTableDataCell>

                    {/* Toggle Button */}
                    <CTableDataCell className="text-center align-middle" key={property._id}>
                      {loadingPropertyId === property._id ? (
                        <CSpinner color="primary" />
                      ) : (
                        <CButton
                          color={property.isFavorite ? 'success' : 'secondary'}
                          onClick={() => handleToggleClick(property._id, !property.isFavorite)}
                          style={{
                            width: '40px',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: property.isFavorite ? 'flex-end' : 'flex-start',
                            alignItems: 'center',
                            padding: '2px',
                            margin: '0 auto', // Center the button
                          }}
                        >
                          <span
                            style={{
                              height: '20px',
                              width: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'white',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                          ></span>
                        </CButton>
                      )}
                    </CTableDataCell>

                    {/* Action Buttons */}
                    <CTableDataCell className="text-center align-middle">
                      <div className="d-flex justify-content-center gap-2">
                        <CButton color="primary" onClick={() => handleViewDetails(property)}>
                          <FaEye />
                        </CButton>
                        <CButton color="warning" onClick={() => handleEditProperty(property)}>
                          <CiEdit />
                        </CButton>
                        {deletePropertyId === property._id ? (
                          <CSpinner color="primary" />
                        ) : (
                          <CButton
                            color="danger"
                            onClick={() => handleDeleteProperty(property._id)}
                          >
                            <MdDeleteForever />
                          </CButton>
                        )}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <p>No properties available</p>
          )}

          {/* Details Modal */}
          {selectedProperty && (
            <CModal
              visible={detailsModal}
              // style={{ marginTop: '50px', zIndex: 9999 }}
              onClose={() => setDetailsModal(false)}
            >
              <CModalHeader>
                <CModalTitle>Property Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {/* Property Name and Nickname */}
                <p>
                  <strong>Property Name:</strong> {selectedProperty.propertyName}
                </p>
                <p>
                  <strong>Property Nickname:</strong> {selectedProperty.propertyNickname}
                </p>

                {/* Description */}
                <p>
                  <strong>Description:</strong> {selectedProperty.propertyDescription}
                </p>

                {/* Price Range */}
                <p>
                  <strong>Price Per Day Per PErson:</strong> $
                  {selectedProperty?.pricePerPersonPerDay}
                </p>

                {/* Address */}
                <p>
                  <strong>Address:</strong> {selectedProperty?.location?.address}
                </p>

                <p>
                  <strong>Coordinates:</strong> Latitude: {selectedProperty.location.latitude},
                  Longitude: {selectedProperty.location.longitude}
                </p>

                <p>
                  <strong>Vendor ID:</strong> {selectedProperty.vendorId}
                </p>

                {/* Custom Fields */}
                <p>
                  <strong>Custom Fields:</strong>
                </p>
                {selectedProperty.customFields.length > 0 ? (
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                          Field Name
                        </th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProperty.customFields.map((field, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{field.key}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {field.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No custom fields available.</p>
                )}

                <p>
                  <strong>Admin Commission:</strong>{' '}
                  {selectedProperty?.adminCommission !== undefined
                    ? `${selectedProperty.adminCommission}%`
                    : 'Property Not Approved'}
                </p>
                <p>
                  <strong>Admin Commission:</strong>{' '}
                  {selectedProperty?.cancellationCharge !== 0
                    ? `${selectedProperty.cancellationCharge}%`
                    : 'Property Not Approved'}
                </p>

                <p>
                  <strong>Start Date:</strong>{' '}
                  {new Date(selectedProperty.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {new Date(selectedProperty.endDate).toLocaleDateString()}
                </p>
                {selectedProperty?.disabledDates && (
                  <p>
                    <strong>Disabled Dates:</strong>
                    {selectedProperty.disabledDates.length > 0 ? (
                      <ul
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '10px',
                        }}
                      >
                        {selectedProperty.disabledDates.map((date, index) => (
                          <li key={index}>{new Date(date).toLocaleDateString()}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No disabled dates available.</span>
                    )}
                  </p>
                )}

                {/* Approval */}
                <p>
                  <strong>Approved by Admin:</strong>{' '}
                  {selectedProperty.isApproveByAdmin ? 'Yes' : 'No'}
                </p>

                {/* Favorite */}
                <p>
                  <strong>Favorite:</strong> {selectedProperty.isFavorite ? 'Yes' : 'No'}
                </p>

                {/* Created At */}
                <p>
                  <strong>Created At:</strong>{' '}
                  {new Date(selectedProperty.createdAt).toLocaleString()}
                </p>

                {/* Images */}
                <div>
                  <strong>Images:</strong>
                  <div
                    style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}
                  >
                    {selectedProperty.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Property image ${idx + 1}`}
                        style={{
                          width: '100px',
                          height: 'auto',
                          borderRadius: '5px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CModalBody>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setDetailsModal(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          )}
        </CCardBody>
        <CModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          size="lg"
          className="hello"
        >
          <CModalHeader>
            <CModalTitle>{editMode ? 'Edit Property' : 'Add Property'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Property Name"
                  name="property_name"
                  value={newProperty.property_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Property nick Name"
                  name="property_nickname"
                  value={newProperty.property_nickname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="categoryDropdown">Category</label>
                <select
                  id="categoryDropdown"
                  className="form-control"
                  value={newProperty.category || ''}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a Category</option>
                  {categoryAll.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <CFormTextarea
                  label="Description"
                  name="property_description"
                  value={newProperty.property_description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="Price Per Day Per Person ( in $ )"
                  name="pricePerPersonPerDay"
                  value={newProperty.pricePerPersonPerDay}
                  onChange={handleChange}
                />
              </div>

              {/* Additional Fields */}
              <h5>Additional Details</h5>
              {newProperty.customFields.map((field, index) => (
                <CRow key={index} className="align-items-center mb-2">
                  <CCol xs="8">
                    <span>
                      <strong>{field.key}</strong>: {field.value}
                    </span>
                  </CCol>
                  <CCol xs="4" className="text-right">
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveCustomField(index)}
                    >
                      Remove
                    </CButton>
                  </CCol>
                </CRow>
              ))}

              <CRow className="mt-4">
                <CCol xs="5">
                  <CFormInput
                    type="text"
                    placeholder="Field Name"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                  />
                </CCol>
                <CCol xs="5">
                  <CFormInput
                    type="text"
                    placeholder="Field Value"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                  />
                </CCol>
                <CCol xs="2">
                  <CButton color="primary" onClick={handleAddCustomField}>
                    Add
                  </CButton>
                </CCol>
              </CRow>
            </div>

            <CFormLabel>Images</CFormLabel>
            <div className="image-preview">
              {newProperty.images.map((image, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <CFormInput type="file" multiple onChange={handleFileChange} ref={fileInputRef} />

            <CRow className="my-3">
              <CCol md={6}>
                <CFormLabel className="mx-3">Start Date:</CFormLabel>
                <div className="input-group">
                  <DatePicker
                    selected={newProperty.startDate}
                    onChange={handleStartDateChange}
                    placeholderText="dd/MM/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    customInput={<CFormInput />}
                    minDate={new Date()} // Disable past dates
                    onClickOutside={() => {}}
                  />
                  <span className="input-group-text date-picker-icon">
                    <FaCalendarAlt />
                  </span>
                </div>
              </CCol>

              <CCol md={6}>
                <CFormLabel className="mx-3">End Date:</CFormLabel>
                <div className="input-group">
                  <DatePicker
                    selected={newProperty.endDate}
                    onChange={handleEndDateChange}
                    placeholderText="dd/MM/yyyy"
                    dateFormat="dd/MM/yyyy"
                    minDate={newProperty.startDate || new Date()}
                    className="form-control"
                    customInput={<CFormInput />}
                  />
                  <span className="input-group-text date-picker-icon">
                    <FaCalendarAlt />
                  </span>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <h5 className="mx-3">Select Disabled/Unavailable Dates</h5>
              <CCol>
                <DatePicker
                  selected={null}
                  onChange={handleDateChange}
                  inline
                  shouldCloseOnSelect={false}
                  highlightDates={selectedDates.map((date) => new Date(date))} // Convert ISO strings to Date objects for highlighting
                  dayClassName={(date) => (isDateDisabled(date) ? 'disabled-date' : '')}
                />
              </CCol>
              <CCol>
                <h5>Selected Dates:</h5>
                {selectedDates.length > 0 ? (
                  <ul>
                    {selectedDates.map((date, index) => (
                      <li key={index}>{new Date(date).toLocaleDateString()}</li> // Convert to Date before formatting
                    ))}
                  </ul>
                ) : (
                  <p>No dates selected</p>
                )}
              </CCol>
            </CRow>

            <h5>Location</h5>
            <useLoadScript
              googlemapsapikey="AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s"
              libraries={libraries}
            >
              <div className="mb-2">
                <CFormLabel htmlFor="address" style={{ fontSize: '0.875rem' }}>
                  Address
                </CFormLabel>
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <CFormInput
                    id="address"
                    name="address"
                    placeholder="Enter shop address"
                    value={newProperty.address}
                    onChange={handleChange}
                    required
                    style={{ fontSize: '0.875rem', height: '2rem' }}
                  />
                </Autocomplete>
              </div>
            </useLoadScript>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
            {IsLoading ? (
              <CSpinner color="primary" />
            ) : (
              <CButton color="warning" onClick={addOrUpdateProperty}>
                {editMode ? 'Update Property' : 'Add Property'}
              </CButton>
            )}
          </CModalFooter>
        </CModal>
      </CCard>
    </div>
  )
}

export default PropertyManagement
