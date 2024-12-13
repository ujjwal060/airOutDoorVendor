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
      console.error('Error updating favorite status', error)
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

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [newProperty, setNewProperty] = useState({
    selectedDates: [],
    property_nickname: '',
    category: '',
    property_name: '',
    property_description: '',
    startDate: '',
    endDate: '',
    priceRange: { min: '', max: '' },
    address: '',
    latitude: '',
    longitude: '',
    instant_booking: active,
    images: [],
    acreage: '',
    guided_hunt: 'Optional',
    guest_limit: '',
    lodging: '',
    shooting_range: '',
    extended_details: '',
    groupPrice: '',
    groupSize: '',
    cancellation_policy: false,
    guest_perPrice: '',
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
      startDate: property.startDate ? new Date(property.startDate) : '',
      endDate: property.endDate ? new Date(property.endDate) : '',
      priceRange: property.priceRange || { min: '', max: '' },
      address: property.location?.address || '',
      latitude: property.location?.latitude || '',
      longitude: property.location?.longitude || '',
      instant_booking: property.instant_booking || false,
      images: property.images || [],
      acreage: property.details?.acreage || '',
      guided_hunt: property.details?.guided_hunt || '',
      guest_limit: property.details?.guestLimitPerDay || '',
      lodging: property.details?.lodging || '',
      shooting_range: property.details?.shootingRange || '',
      extended_details: property.details?.optionalExtendedDetails || '',
      groupPrice: property.pricePerGroupSize?.groupPrice || '',
      groupSize: property.pricePerGroupSize?.groupSize || '',
      cancellation_policy: property.cancellation_policy || false,
      guest_perPrice: property.details?.guestPricePerDay || '',
      _id: property._id || '',
    })

    setEditMode(true) // Enable edit mode
    setModalVisible(true) // Show the modal
  }

  // const addOrUpdateProperty = async () => {
  //   const formData = new FormData()

  //   const appendField = (key, value) => {
  //     if (value !== undefined && value !== null) {
  //       formData.append(key, value)
  //     }
  //   }

  //   appendField('vendorId', vendorId)
  //   appendField('property_nickname', newProperty.property_nickname)
  //   appendField('category', newProperty.category)
  //   appendField('property_description', newProperty.property_description)
  //   appendField('instant_booking', newProperty.instant_booking)
  //   appendField('property_name', newProperty.property_name)
  //   appendField('acreage', newProperty.acreage)
  //   appendField('guided_hunt', newProperty.guided_hunt)
  //   appendField('guest_limit', newProperty.guest_limit)
  //   appendField('lodging', newProperty.lodging)
  //   appendField('shooting_range', newProperty.shooting_range)
  //   appendField('extended_details', newProperty.extended_details)
  //   appendField('address', newProperty.address)
  //   appendField('groupPrice', newProperty.groupPrice)
  //   appendField('groupSize', newProperty.groupSize)
  //   appendField('latitude', newProperty.latitude)
  //   appendField('longitude', newProperty.longitude)
  //   appendField('checkIn', newProperty.startDate)
  //   appendField('checkOut', newProperty.endDate)
  //   appendField('priceRange', JSON.stringify(newProperty.priceRange))
  //   appendField('guest_perPrice', newProperty.guest_perPrice)

  //   newProperty.images.forEach((image) => {
  //     if (typeof image === 'string') {
  //       formData.append('existingImages', image)
  //     } else {
  //       formData.append('images', image)
  //     }
  //   })

  //   try {
  //     SetIsLoading(true)

  //     const isUpdate = Boolean(newProperty._id)
  //     const url = isUpdate
  //       ? `http://44.196.64.110:8000/property/update/${newProperty._id}`
  //       : `http://44.196.64.110:8000/property/post`
  //     const method = isUpdate ? 'put' : 'post'

  //     const response = await axios({
  //       method: method,
  //       url: url,
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })

  //     console.log('Property added/updated successfully:', response.data)
  //     setModalVisible(false)
  //     fetchProperties()
  //   } catch (error) {
  //     console.error('Error adding/updating property:', error)
  //     alert('Failed to add/update the property. Please try again.')
  //   } finally {
  //     SetIsLoading(false)
  //   }
  // }

  const addOrUpdateProperty = async () => {
    const propertyData = {
      vendorId,
      property_nickname: newProperty.property_nickname,
      category: newProperty.category,
      property_description: newProperty.property_description,
      instant_booking: newProperty.instant_booking,
      property_name: newProperty.property_name,
      acreage: newProperty.acreage,
      guided_hunt: newProperty.guided_hunt,
      guest_limit: newProperty.guest_limit,
      lodging: newProperty.lodging,
      shooting_range: newProperty.shooting_range,
      extended_details: newProperty.extended_details,
      address: newProperty.address,
      groupPrice: newProperty.groupPrice,
      groupSize: newProperty.groupSize,
      latitude: newProperty.latitude,
      longitude: newProperty.longitude,
      checkIn: newProperty.startDate,
      checkOut: newProperty.endDate,
      priceRange: JSON.stringify(newProperty.priceRange),
      guest_perPrice: newProperty.guest_perPrice,
      disabledDates: JSON.stringify(selectedDates),
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
          formData.append('existingImages', image)
        } else {
          formData.append('images', image)
        }
      })
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
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
        },
      })

      console.log('Property added/updated successfully:', response.data)
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
                  <CTableHeaderCell>Guest Limit/Day</CTableHeaderCell>
                  <CTableHeaderCell>Guest Price/Day</CTableHeaderCell>
                  <CTableHeaderCell>Acreage</CTableHeaderCell>
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
                    <CTableDataCell className="text-center align-middle">
                      {property?.propertyName}
                    </CTableDataCell>

                    {/* Address */}
                    <CTableDataCell className="text-center align-middle">
                      {property.location.address}
                    </CTableDataCell>

                    {/* Guest Limit */}
                    <CTableDataCell className="text-center align-middle">
                      {property.details.guestLimitPerDay}
                    </CTableDataCell>

                    {/* Guest Price */}
                    <CTableDataCell className="text-center align-middle">
                      {property.details.guestPricePerDay}
                    </CTableDataCell>

                    {/* Acreage */}
                    <CTableDataCell className="text-center align-middle">
                      {property.details.acreage}
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

                {/* Acreage */}
                <p>
                  <strong>Acreage:</strong> {selectedProperty.details.acreage}
                </p>

                {/* Guest Details */}
                <p>
                  <strong>Guest Limit Per Day:</strong> {selectedProperty.details.guestLimitPerDay}
                </p>
                <p>
                  <strong>Guest Price Per Day:</strong> ${selectedProperty.details.guestPricePerDay}
                </p>

                {/* Guided Hunt */}
                <p>
                  <strong>Guided Hunt:</strong> {selectedProperty.details.guidedHunt}
                </p>

                {/* Lodging */}
                <p>
                  <strong>Lodging:</strong> {selectedProperty.details.lodging}
                </p>

                {/* Shooting Range */}
                <p>
                  <strong>Shooting Range:</strong> {selectedProperty.details.shootingRange}
                </p>

                {/* Optional Extended Details */}
                <p>
                  <strong>Optional Extended Details:</strong>{' '}
                  {selectedProperty.details.optionalExtendedDetails}
                </p>

                {/* Price Range */}
                <p>
                  <strong>Price Range:</strong> ${selectedProperty.priceRange.min} - $
                  {selectedProperty.priceRange.max}
                </p>

                <p>
                  <strong>Price Per Group Size:</strong>
                  {selectedProperty.pricePerGroupSize.groupPrice
                    ? `$${selectedProperty.pricePerGroupSize.groupPrice} for ${selectedProperty.pricePerGroupSize.groupSize} guests`
                    : `N/A`}
                </p>

                <p>
                  <strong>Instant Booking:</strong>{' '}
                  {selectedProperty.details.instantBooking ? 'Yes' : 'No'}
                </p>

                {/* Address */}
                <p>
                  <strong>Address:</strong> {selectedProperty.location.address}
                </p>

                <p>
                  <strong>Coordinates:</strong> Latitude: {selectedProperty.location.latitude},
                  Longitude: {selectedProperty.location.longitude}
                </p>

                <p>
                  <strong>Vendor ID:</strong> {selectedProperty.vendorId}
                </p>

                <p>
                  <strong>Category:</strong> {selectedProperty.category}
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

                {/* Availability */}
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
                  label="Min Price"
                  name="priceRange.min"
                  value={newProperty.priceRange.min}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="Max Price"
                  name="priceRange.max"
                  value={newProperty.priceRange.max}
                  onChange={handleChange}
                />
              </div>

              {/* Additional Fields */}
              <h5>Additional Details</h5>
              <div className="col-md-6">
                <CFormInput
                  label="Acreage"
                  name="acreage"
                  type="number"
                  value={newProperty.acreage}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormLabel htmlFor="guided_hunt">Guided Hunt</CFormLabel>
                <CFormSelect
                  id="guided_hunt"
                  name="guided_hunt"
                  value={newProperty.guided_hunt}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Optional">Optional</option>
                </CFormSelect>
              </div>

              <div className="col-md-6">
                <CFormInput
                  label="Guest Limit"
                  name="guest_limit"
                  type="number"
                  value={newProperty.guest_limit}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="Price Per Guest"
                  name="guest_perPrice"
                  value={newProperty.guest_perPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Lodging"
                  name="lodging"
                  value={newProperty.lodging}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="Shooting Range"
                  name="shooting_range"
                  value={newProperty.shooting_range}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Extended Details"
                  name="extended_details"
                  value={newProperty.extended_details}
                  onChange={handleChange}
                />
              </div>
              <h5>Price Per Group Size</h5>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="groupSize"
                  name="groupSize"
                  value={newProperty.groupSize}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  type="number"
                  label="Price Per Group"
                  name="groupPrice"
                  value={newProperty.groupPrice}
                  onChange={handleChange}
                />
              </div>

              {/* Cancellation Policy Checkbox */}
              <div className="col-md-12">
                <CFormCheck
                  label="Cancellation Policy"
                  name="cancellation_policy"
                  checked={newProperty.cancellation_policy}
                  onChange={handleChange}
                />
              </div>
            </div>

            <CFormLabel>Images</CFormLabel>
            <div className="image-preview">
              {newProperty.images.map((image, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    src={image}
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
                    // Trigger the calendar on icon click
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
