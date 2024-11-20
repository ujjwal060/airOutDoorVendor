import React, { useState, useEffect,useRef } from 'react'
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
import { toast, ToastContainer } from 'react-toastify' // For notifications
import 'react-toastify/dist/ReactToastify.css' // Toastify styles
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './messagelist.css'

const libraries = ['places'];

const apiKey = 'AIzaSyAHWgq2_Us0Dq7UcVoP4FRGYcDqDh6XH_M'

const PropertyManagement = () => {
  const [properties, setProperties] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [active, setIsActive] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [categoryAll, setCategoryAll] = useState([])
  const autocompleteRef = useRef(null);
  const [newProperty, setNewProperty] = useState({
    property_nickname: '',
    category: '',
    property_description: '',
    startDate: '',
    endDate: '',
    priceRange: { min: '', max: '' },
    address: '',
    latitude: '',
    longitude: '',
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

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setNewProperty((prev) => ({
      ...prev,
      category: selectedCategoryId,
    }));
  };

  const getCatgory = async () => {
    try {
      const responce = await axios.post('http://44.196.192.232:8000/catogries/get');
      console.log(responce.data.data);
      setCategoryAll(responce.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  // data formating handleer  

  const handleStartDateChange = (date) => {
    setNewProperty((prev) => ({ ...prev, startDate: date })); // Keep as a Date object
  };

  const handleEndDateChange = (date) => {
    setNewProperty((prev) => ({ ...prev, endDate: date })); // Keep as a Date object
  };

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
    getCatgory()
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

  const addOrUpdateProperty = async () => {
  }

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    const address = place.formatted_address;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    setNewProperty({
        ...newProperty,
        address,
        latitude,
        longitude,
    });
};

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
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg" className='hello'>
          <CModalHeader>
            <CModalTitle>{editMode ? 'Edit Property' : 'Add Property'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Name"
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
                  value={newProperty.category || ""}
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
              <LoadScript googleMapsApiKey="AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s" libraries={libraries}>
                <div className="mb-2">
                  <CFormLabel htmlFor="address" style={{ fontSize: '0.875rem' }}>Address</CFormLabel>
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
                      style={{ fontSize: '0.875rem', height: '2rem'}}
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
