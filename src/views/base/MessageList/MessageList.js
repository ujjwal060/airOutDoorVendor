import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
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
} from '@coreui/react' // CoreUI components
import axios from 'axios' // For HTTP requests
import { toast } from 'react-toastify' // For notifications
import 'react-toastify/dist/ReactToastify.css' // Toastify styles
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'

// toast.configure(); // Initialize Toastify

const apiKey = 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M'

const PropertyManagement = () => {
  const [properties, setProperties] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [active, setIsActive] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [availableDateRange, setAvailableDateRange] = useState({ start: '', end: '' })
  const [coordinates, setCoordinates] = useState(null)
  const [error, setError] = useState(null)

  const [newProperty, setNewProperty] = useState({
    propery_nickname: '',
    category: '',
    property_description: '',
    startDate: '',
    endDate: '',
    priceRange: { min: '', max: '' },
    location: { address: '', city: '', state: '', zip_code: '' },
    instant_booking: active,
    images: null,
    acreage: '',
    guided_hunt: '',
    guest_limit: '',
    lodging: '',
    shooting_range: '',
    extended_details: '',
    pricePerGroupSize: [{ groupSize: '', price: '' }],
    cancellation_policy: false,
  })

  const handleLocationChange = (e) => {
    const { name, value } = e.target
    setNewProperty((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }))
  }

  const formatToDDMMYYYY = (date) => {
    const d = new Date(date); // Ensure it's a Date object
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // data formating handleer  
  
  const handleStartDateChange = (date) => {
    const formattedDate = formatToDDMMYYYY(date);
    setNewProperty((prev) => ({ ...prev, startDate: formattedDate }))
  }

  const handleEndDateChange = (date) => {
    const formattedDate = formatToDDMMYYYY(date);
    setNewProperty((prev) => ({ ...prev, endDate: formattedDate }))
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

  // Fetch properties from the server
  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8000/host/getproperty')
      setProperties(Array.isArray(response.data.data) ? response.data.data : [])
    } catch (error) {
      console.error('Error fetching properties:', error)
      setProperties([]) // Fallback to an empty array on error
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setNewProperty((prev) => ({ ...prev, images: files }))
  }

  const handlePricePerGroupSizeChange = (index, field, value) => {
    setNewProperty((prev) => {
      const updatedArray = [...prev.pricePerGroupSize];
      updatedArray[index][field] = value;
      return { ...prev, pricePerGroupSize: updatedArray };
    });
  };

  const addPricePerGroupSize = () => {
    setNewProperty((prev) => ({
      ...prev,
      pricePerGroupSize: [...prev.pricePerGroupSize, { groupSize: '', price: '' }],
    }));
  };
  
  const removePricePerGroupSize = (index) => {
    setNewProperty((prev) => ({
      ...prev,
      pricePerGroupSize: prev.pricePerGroupSize.filter((_, i) => i !== index),
    }));
  };
  
  

  // creating logitude and latitude of the addresss

  const geocodeAddress = async (address, city, zipCode) => {
    const fullAddress = `${address}, ${city}, ${zipCode}`
    console.log('full address', fullAddress)
    try {
      const response = await axios.get(
        // `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`,
      )
      console.log('gapi', response)
      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location
        setCoordinates(location)

        setError(null)
        return location // Ensure to return the coordinates here
      } else {
        setError('Address not found')
        setCoordinates(null)
        return null // Return null if no coordinates are found
      }
    } catch (err) {
      setError('Error fetching data')
      setCoordinates(null)
      return null // Return null in case of an error
    }
  }

  const addOrUpdateProperty = async () => {
    const coordinates = await geocodeAddress(
      newProperty.location.address,
      newProperty.location.city,
      newProperty.location.zip_code,
    )
    console.log('printing coordinates', coordinates)
    const formData = new FormData()

    // Append all keys from the newProperty object
    Object.keys(newProperty).forEach((key) => {
      if (key === 'location' && typeof newProperty[key] === 'object') {
        Object.keys(newProperty.location).forEach((locationKey) => {
          formData.append(`location[${locationKey}]`, newProperty.location[locationKey])
        })
      } else if (Array.isArray(newProperty[key])) {
        newProperty[key].forEach((item, index) => {
          if (typeof item === 'object') {
            Object.keys(item).forEach((subKey) => {
              formData.append(`${key}[${index}][${subKey}]`, item[subKey])
            })
          } else {
            formData.append(`${key}[${index}]`, item)
          }
        })
      } else if (key !== 'images') {
        formData.append(key, newProperty[key])
      }
    })

    // Append images array if it exists
    if (newProperty.images && newProperty.images.length > 0) {
      newProperty.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    // Log FormData content for debugging
    console.log('FormData latest')
    formData.forEach((value, key) => {
      console.log(`${key}:`, value)
    })

    // Retrieve vendorId from local storage
    const vendorId = localStorage.getItem('vendorId')
    if (!vendorId) {
      toast.error('Vendor ID not found in local storage')
      return
    }

    // Append vendorId to FormData
    formData.append('vendorId', vendorId)
    formData.append('coodinates', coordinates)

    try {
      if (editMode) {
        // Update property if edit mode is enabled
        await axios.put(
          `http://44.196.192.232:8000/property/update/${selectedPropertyId}`,
          formData,
        )
        toast.success('Property updated successfully')
      } else {
        // Add new property
        await axios.post('http://localhost:8000/host/add', formData)
        toast.success('Property added successfully')
      }

      // Refresh the property list
      fetchProperties()
    } catch (error) {
      console.error('Error adding/updating property:', error)
      toast.error(error.response?.data?.message || 'Error adding/updating property')
    } finally {
      // Close modal after submission
      setModalVisible(false)
    }
  }

  return (
    <div>
      <CCard>
        <CCardHeader>
          Property Management
          <CButton color="warning" onClick={() => setModalVisible(true)} style={{ float: 'right' }}>
            Add Property
          </CButton>
        </CCardHeader>
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle>{editMode ? 'Edit Property' : 'Add Property'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Name"
                  name="propery_nickname"
                  value={newProperty.propery_nickname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Category"
                  name="category"
                  value={newProperty.category}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
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

              <h5>Location</h5>
              <div className="row">
                <div className="col-md-6">
                  <CFormInput
                    label="Address"
                    name="address"
                    value={newProperty.location.address}
                    onChange={(e) => handleLocationChange(e)}
                  />
                </div>
                <div className="col-md-6">
                  <CFormInput
                    label="City"
                    name="city"
                    value={newProperty.location.city}
                    onChange={(e) => handleLocationChange(e)}
                  />
                </div>
                <div className="col-md-6">
                  <CFormInput
                    label="State"
                    name="state"
                    value={newProperty.location.state}
                    onChange={(e) => handleLocationChange(e)}
                  />
                </div>
                <div className="col-md-6">
                  <CFormInput
                    label="Zip Code"
                    name="zip_code"
                    value={newProperty.location.zip_code}
                    onChange={(e) => handleLocationChange(e)}
                  />
                </div>
              </div>

              {/* Additional Fields */}
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

              {/* pricew according to group sizze  */}

              <div className="mt-3">
                <h5>Price Per Group Size</h5>
                {newProperty.pricePerGroupSize.map((item, index) => (
                  <CRow key={index} className="align-items-center mb-3">
                    <CCol md={5}>
                      <CFormInput
                        label={`Group Size (${index + 1})`}
                        value={item.groupSize}
                        onChange={(e) =>
                          handlePricePerGroupSizeChange(index, 'groupSize', e.target.value)
                        }
                        placeholder="Enter group size"
                      />
                    </CCol>
                    <CCol md={5}>
                      <CFormInput
                        label="Price"
                        value={item.price}
                        onChange={(e) =>
                          handlePricePerGroupSizeChange(index, 'price', e.target.value)
                        }
                        placeholder="Enter price"
                      />
                    </CCol>
                    <CCol md={2} className="d-flex mt-[15px] align-items-end">
                      <CButton color="secondary" onClick={() => removePricePerGroupSize(index)}>
                        Remove
                      </CButton>
                    </CCol>
                  </CRow>
                ))}

                <CButton color="warning" onClick={addPricePerGroupSize}>
                  Add New Group Size
                </CButton>
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
