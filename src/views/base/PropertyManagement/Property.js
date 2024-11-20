import React, { useState, useEffect, useRef } from 'react'
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
} from '@coreui/react' // CoreUI components
import axios from 'axios' // For HTTP requests
import { toast, ToastContainer } from 'react-toastify' // For notifications
import 'react-toastify/dist/ReactToastify.css' // Toastify styles
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import './property.css'

const libraries = ['places']


const PropertyManagement = () => {
    const [properties, setProperties] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [active, setIsActive] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [categoryAll, setCategoryAll] = useState([])
    const autocompleteRef = useRef(null)
    const [detailsModal, setDetailsModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [newProperty, setNewProperty] = useState({
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
        guided_hunt: '',
        guest_limit: '',
        lodging: '',
        shooting_range: '',
        extended_details: '',
        groupPrice: '',
        groupSize: '',
        cancellation_policy: false,
    })

    const vendorId=localStorage.getItem('vendorId')

    const handleViewDetails = (property) => {
        setSelectedProperty(property);
        setDetailsModal(true);
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value
        setNewProperty((prev) => ({
            ...prev,
            category: selectedCategoryId,
        }))
    }

    const getCatgory = async () => {
        try {
            const responce = await axios.post('http://44.196.192.232:8000/catogries/get')
            setCategoryAll(responce.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleStartDateChange = (date) => {
        setNewProperty((prev) => ({ ...prev, startDate: date }))
    }

    const handleEndDateChange = (date) => {
        setNewProperty((prev) => ({ ...prev, endDate: date })) // Keep as a Date object
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
            const response = await axios.get(`http://44.196.192.232:8000/property/get/${vendorId}`)
            setProperties(Array.isArray(response.data) ? response.data : [])
        } catch (error) {
            console.error('Error fetching properties:', error)
            setProperties([]) // Fallback to an empty array on error
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setNewProperty((prev) => ({ ...prev, images: files }))
    }

    const addOrUpdateProperty = async () => {
        const formData = new FormData()
        formData.append('vendorId', vendorId)
        formData.append('property_nickname', newProperty.property_nickname)
        formData.append('category', newProperty.category)
        formData.append('property_description', newProperty.property_description)
        formData.append('instant_booking', newProperty.instant_booking)
        formData.append('property_name', newProperty.property_name)
        formData.append('acreage', newProperty.acreage)
        formData.append('guided_hunt', newProperty.guided_hunt)
        formData.append('guest_limit', newProperty.guest_limit)
        formData.append('lodging', newProperty.lodging)
        formData.append('shooting_range', newProperty.shooting_range)
        formData.append('extended_details', newProperty.extended_details)
        formData.append('address', newProperty.address)
        formData.append('groupPrice', newProperty.groupPrice)
        formData.append('groupSize', newProperty.groupSize)
        // formData.append('state', newProperty.state)
        // formData.append('country', newProperty.country)
        formData.append('latitude', newProperty.latitude)
        formData.append('longitude', newProperty.longitude)
        formData.append('checkIn', newProperty.startDate)
        formData.append('checkOut', newProperty.endDate)
        formData.append('priceRange', JSON.stringify(newProperty.priceRange))
        if (newProperty.images && newProperty.images.length > 0) {
            newProperty.images.forEach((image) => {
                formData.append('images', image)
            })
        }

        try {
            const response = await axios.post('http://44.196.192.232:8000/property/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setModalVisible(false)
            fetchProperties()
        } catch (error) {
            console.error('Error adding/updating property:', error)
        }
    }

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace()
        const address = place.formatted_address
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        setNewProperty({
            ...newProperty,
            address,
            latitude,
            longitude,
        })
    }

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
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {properties.map((property, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>
                                            <img
                                                src={property.images[0]} // Display the first image
                                                alt={property.propertyName}
                                                style={{ width: '80px', height: 'auto' }}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>{property.propertyName}</CTableDataCell>
                                        <CTableDataCell>{property.location.address}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton
                                                color="primary"
                                                onClick={() => handleViewDetails(property)}
                                            >
                                                View Details
                                            </CButton>
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
                        <CModal visible={detailsModal} onClose={() => setDetailsModal(false)}>
                            <CModalHeader>
                                <CModalTitle>Property Details</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <p><strong>Property Name:</strong> {selectedProperty.propertyName}</p>
                                <p><strong>Property Nickname:</strong> {selectedProperty.propertyNickname}</p>
                                <p><strong>Description:</strong> {selectedProperty.propertyDescription}</p>
                                <p><strong>Acreage:</strong> {selectedProperty.details.acreage}</p>
                                <p><strong>Guest Limit Per Day:</strong> {selectedProperty.details.guestLimitPerDay}</p>
                                <p><strong>Guided Hunt:</strong> {selectedProperty.details.guidedHunt}</p>
                                <p><strong>Price Range:</strong> ${selectedProperty.priceRange.min} - ${selectedProperty.priceRange.max}</p>
                                <p><strong>Instant Booking:</strong> {selectedProperty.details.instantBooking ? "Yes" : "No"}</p>
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
                                    label="Min Price"
                                    name="priceRange.min"
                                    value={newProperty.priceRange.min}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
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
                                    value={newProperty.acreage}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Guided Hunt"
                                    name="guided_hunt"
                                    value={newProperty.guided_hunt}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Guest Limit"
                                    name="guest_limit"
                                    value={newProperty.guest_limit}
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
                                    label="groupSize"
                                    name="groupSize"
                                    value={newProperty.groupSize}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="group per price"
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
                        <CFormInput type="file" multiple onChange={handleFileChange} />
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
                                        onClickOutside={() => { }}
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
                        <h5>Location</h5>
                        <LoadScript
                            googleMapsApiKey="AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s"
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
                        </LoadScript>
                    </CModalBody>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="warning" onClick={addOrUpdateProperty}>
                            {editMode ? 'Update Property' : 'Add Property'}
                        </CButton>
                    </CModalFooter>
                </CModal>
            </CCard>
        </div>
    )
}

export default PropertyManagement
