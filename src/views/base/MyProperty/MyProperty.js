import React, { useState, useEffect, useRef } from 'react';
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
    CFormTextarea,
    CFormSelect,
    CRow,
    CCol,
    CContainer
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './MyProperty.scss'
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [availableDateRange, setAvailableDateRange] = useState({ start: '', end: '' });
    const [selectedImages, setSelectedImages] = useState([]);
    const [categories, setCategories] = useState([]);

    const [currentProperty, setCurrentProperty] = useState({
        propertyNickname: '', // Changed from propery_nickname to match schema
        category: '',
        propertyDescription: '', // Changed from property_description
        instantBooking: false, // Changed from instant_booking, set to boolean
        
        priceRange: { 
            min: '', 
            max: '' 
        },
    
        guestLimitPerDay: '', // Matches guestLimitPerDay in schema
        guestPricePerDay: '', // Added to match schema
    
        cancellationPolicy: '',
        
        pricePerGroupSize: [{ guests: '', price: '' }], // Adjusted key from groupSize to guests
        
        images: [],
    
        details: {
            acreage: '',
            guidedHunt: '', // Changed from guided_hunt to guidedHunt
            guestLimitPerDay: '', // Nested under details to match schema
            lodging: '', 
            shootingRange: '',
            optionalExtendedDetails: '' // Adjusted key from extended_details
        },
    
        location: {
            address: '',
            city: '',
            state: '',
            postalCode: '',
            latitude: '', // Added to match schema
            longitude: ''  // Added to match schema
        },
    
        calendar: {
            availableDates: [
                {
                    from: '', 
                    to: ''
                }
            ]
        },
    
        isApproveByAdmin: false // Added to match schema
    });
    

    const autocompleteRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s", // Replace with your API key
        libraries,
    });

    // const handlePlaceSelect = (place) => {
    //     if (!place.geometry) {
    //         console.error("Selected place has no geometry");
    //         return;
    //     }

    //     let city = '', state = '', postalCode = '', address = '';
    //     place.address_components.forEach((component) => {
    //         const types = component.types;
    //         if (types.includes("locality") || types.includes("sublocality")) {
    //             city = component.long_name;
    //         }
    //         if (types.includes("administrative_area_level_1")) {
    //             state = component.short_name;
    //         }
    //         if (types.includes("postal_code")) {
    //             postalCode = component.long_name;
    //         }
    //         if (types.includes("street_address") || types.includes("route")) {
    //             address += component.long_name + ' ';
    //         }
    //     });

    //     setCurrentProperty((prev) => ({
    //         ...prev,
    //         location: {
    //             ...prev.location,
    //             address: address.trim(),
    //             city,
    //             state,
    //             postalCode,
    //         },
    //     }));
    // };



    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (!place.geometry) {
                console.error("No geometry found for the selected place.");
                return;
            }
            
            let city = '', state = '', postalCode = '', address = '';
            place.address_components.forEach((component) => {
                const types = component.types;
                if (types.includes("locality") || types.includes("sublocality")) {
                    city = component.long_name;
                }
                if (types.includes("administrative_area_level_1")) {
                    state = component.short_name;
                }
                if (types.includes("postal_code")) {
                    postalCode = component.long_name;
                }
                if (types.includes("street_address") || types.includes("route")) {
                    address += component.long_name + ' ';
                }
            });

            setCurrentProperty((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    address: address.trim(),
                    city,
                    state,
                    postalCode,
                },
            }));
        }
    };



    // Fetch properties from the server
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8000/host/getproperty');
            console.log("111", response.data.data)
            setProperties(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]); // Fallback to an empty array on error
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/catogries/getall');
                console.log('Fetched categories:', response.data); // Log the response

                // Assuming categories are under response.data.data array
                const categoryData = response.data.data.map(item => ({
                    id: item._id,
                    name: item.name
                }));

                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]); // Reset to an empty array on error
            }
        };

        fetchCategories();
    }, []);




    const handleAddProperty = () => {
        setCurrentProperty({
            propertyNickname: '', // Updated name
            category: '',
            propertyDescription: '', // Updated name
            instantBooking: false, // Set default as false and match boolean type
            
            priceRange: { 
                min: '', 
                max: '' 
            },
    
            guestLimitPerDay: '', // Matches schema
            guestPricePerDay: '', // Added to match schema
    
            cancellationPolicy: '',
            
            pricePerGroupSize: [{ guests: '', price: '' }], // Updated name for guests
            
            images: [],
    
            details: {
                acreage: '',
                guidedHunt: '', // Updated name
                guestLimitPerDay: '', // Nested to match schema
                lodging: '', 
                shootingRange: '',
                optionalExtendedDetails: '' // Updated name
            },
    
            location: {
                address: '',
                city: '',
                state: '',
                postalCode: '',
                latitude: '', // Added to match schema
                longitude: ''  // Added to match schema
            },
    
            calendar: {
                availableDates: [
                    {
                        from: '', 
                        to: ''
                    }
                ]
            },
        });
        
        setModalVisible(true);
    };
    


    const handleEditProperty = (property) => {
        setCurrentProperty(property);
        setModalVisible(true);
    };

    const handleDeleteProperty = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/host/deleteproperty/${id}`);
            fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleViewProperty = (property) => {
        setCurrentProperty(property);
        setViewModalVisible(true);
    };

    const handleSave = async () => {
        try {
            if (currentProperty._id) {
                // Update existing property
                await axios.put(`http://localhost:8000/host/updateproperty/${currentProperty._id}`, currentProperty);
            } else {
                // Add new property
                await axios.post('http://localhost:8000/host/add', currentProperty);
            }
            fetchProperties();
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving property:', error);
        }
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('You can only upload a maximum of 5 images.');
            return;
        }
        setSelectedImages(files); // Set selected files to state
    };
    
    

    if (!isLoaded) return <div>Loading...</div>;


    return (
        <div>
            <CCard>
                <CCardHeader>
                    Property Management
                    <CButton color="warning" onClick={handleAddProperty} style={{ float: 'right' }}>
                        Add Property
                    </CButton>
                </CCardHeader>

                <CCardBody>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Sno</CTableHeaderCell>
                                <CTableHeaderCell>Name</CTableHeaderCell>
                                <CTableHeaderCell>Category</CTableHeaderCell>
                                <CTableHeaderCell>description</CTableHeaderCell>
                                {/* <CTableHeaderCell>Price Range</CTableHeaderCell>
                                <CTableHeaderCell>Booking Type</CTableHeaderCell> */}
                                <CTableHeaderCell>Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {Array.isArray(properties) && properties.map((property, index) => (
                                <CTableRow key={property._id}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{property.propertyNickname}</CTableDataCell>
                                    <CTableDataCell>{property.category}</CTableDataCell>
                                    <CTableDataCell className="scrollable-cell">
                                        {property.propertyDescription}
                                    </CTableDataCell>
                                    {/* <CTableDataCell>
                                        {property.priceRange.min} - {property.priceRange.max}
                                    </CTableDataCell> */}
                                    {/* <CTableDataCell>{property.instantBooking}</CTableDataCell> */}
                                    <CTableDataCell>
                                        <CButton color="info" onClick={() => handleViewProperty(property)} className="me-2">
                                            <FontAwesomeIcon icon={faEye} />
                                        </CButton>
                                        <CButton color="warning" onClick={() => handleEditProperty(property)} className="me-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </CButton>
                                        <CButton color="danger" onClick={() => handleDeleteProperty(property._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>

                    </CTable>
                </CCardBody>

                {/* Add/Edit Modal */}
                <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg">

                    <CModalHeader>
                        <CModalTitle>{currentProperty._id ? 'Edit Property' : 'Add Property'}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>

                       {/* Images */}
<div className="row mb-3">
    <div className="col-md-12">
        <h5>Images</h5>
        <CFormInput
    type="file"
    label="Upload Images (Max 5)"
    multiple
    accept="image/*"
    onChange={handleImageChange} // Handles file selection
/>
        <small className="text-muted">You can select up to 5 images.</small>
        {/* Display selected images */}
        <div className="mt-2">
            {selectedImages && selectedImages.length > 0 && (
                <div>
                    <h6>Selected Images:</h6>
                    <div className="d-flex flex-wrap">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="me-2 mb-2">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Selected Image ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Display image thumbnail
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
</div>



                        {/* Basic details*/}
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Basic Details</h5>
                            </div>
                            {/* Form Inputs */}
                            <div className="col-md-6">
                                <CFormInput
                                    label="Property Nick Name"
                                    value={currentProperty.propery_nickname}
                                    onChange={(e) => setCurrentProperty({ ...currentProperty, propery_nickname: e.target.value })}
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="col-md-6">
                                <CFormSelect
                                    label="Category"
                                    value={currentProperty.category}
                                    onChange={(e) => setCurrentProperty({ ...currentProperty, category: e.target.value })}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </CFormSelect>
                            </div>

                            <div className="col-md-6">
                                <CFormSelect
                                    label="Instant Booking"
                                    value={currentProperty.instant_booking}
                                    onChange={(e) => setCurrentProperty({ ...currentProperty, instant_booking: e.target.value })}
                                >
                                    <option value="">Select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </CFormSelect>
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Guest Limit Per Day"
                                    value={currentProperty?.guest_limit}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, guest_limit: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Guest Price Per Day"
                                    value={currentProperty?.guestPricePerDay}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, guestPricePerDay: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Property Name"
                                    value={currentProperty.property_name}
                                    onChange={(e) => setCurrentProperty({ ...currentProperty, property_name: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Cancellation Policy"
                                    value={currentProperty?.cancellationPolicy}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, cancellationPolicy: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormTextarea
                                    label="description"
                                    value={currentProperty.property_description}
                                    onChange={(e) => setCurrentProperty({ ...currentProperty, property_description: e.target.value })}
                                />
                            </div>
                        </div>

                        <hr />
                        {/* Group Size and Price Input Fields */}
                        <div className="col-md-12">
                            <h5>Price Per Group Size</h5>
                            {currentProperty.pricePerGroupSize.map((group, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-6">
                                        <CFormInput
                                            label="Group Size"
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
                                            label="Price"
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
                        {/*price range */}
                        <hr />
                        <div className="col-md-12">
                            <h5>Price Range</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CFormInput
                                    label="Min Price"
                                    value={currentProperty.priceRange}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        priceRange: { ...currentProperty.priceRange, min: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-6">
                                <CFormInput
                                    label="Max Price"
                                    value={currentProperty.priceRange}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        priceRange: { ...currentProperty.priceRange, max: e.target.value }
                                    })}
                                />
                            </div>
                        </div>

                        {/* Location Inputs */}
                        <hr />
                        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="12">
                    <h5>Location</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Address</label>
                            <Autocomplete
                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceChanged}
                            >
                                <CFormInput
                                    type="text"
                                    placeholder="Enter your address"
                                    value={currentProperty.location.address}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        location: { ...currentProperty.location, address: e.target.value }
                                    })}
                                />
                            </Autocomplete>
                        </div>
                        <div className="col-md-6 mb-3">
                            <CFormInput
                                label="City"
                                value={currentProperty.location.city}
                                onChange={(e) => setCurrentProperty({
                                    ...currentProperty,
                                    location: { ...currentProperty.location, city: e.target.value }
                                })}
                            />
                        </div>
                        <div className="col-md-6">
                            <CFormInput
                                label="State"
                                value={currentProperty.location.state}
                                onChange={(e) => setCurrentProperty({
                                    ...currentProperty,
                                    location: { ...currentProperty.location, state: e.target.value }
                                })}
                            />
                        </div>
                        <div className="col-md-6">
                            <CFormInput
                                label="Postal Code"
                                value={currentProperty.location.postalCode}
                                onChange={(e) => setCurrentProperty({
                                    ...currentProperty,
                                    location: { ...currentProperty.location, postalCode: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                </CCol>
            </CRow>
        </CContainer>


                        {/* Details Section */}
                        <hr />
                        <h5>Details</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <CFormInput
                                    label="Acreage"
                                    value={currentProperty?.acreage}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, acreage: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-4">
                                <CFormInput
                                    label="Guided Hunt"
                                    value={currentProperty?.guided_hunt}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, guided_hunt: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-4">
                                <CFormInput
                                    label="Guest Limit"
                                    value={currentProperty?.guest_limit}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, guest_limit: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-4">
                                <CFormInput
                                    label="lodging"
                                    value={currentProperty?.lodging}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, lodging: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-4">
                                <CFormInput
                                    label="Shooting Range"
                                    value={currentProperty?.shooting_range}
                                    onChange={(e) => setCurrentProperty({
                                        ...currentProperty,
                                        details: { ...currentProperty.details, shooting_range: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="col-md-4">
                                <CFormInput
                                    label="Optional Extended Details"
                                    value={currentProperty?.extended_details}
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

                        {/* Check-in and Check-out Date Input Fields */}
                        <hr />
                        <div className="col-md-12">
                            <h5>Check-in and Check-out Dates</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <CFormInput
                                        type="date"
                                        label="Check-in Date"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <CFormInput
                                        type="date"
                                        label="Check-out Date"
                                    />
                                </div>
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

                {/* View Property Modal */}
                <CModal visible={viewModalVisible} onClose={() => setViewModalVisible(false)} size="lg">
                    <CModalHeader>
                        <CModalTitle>View Property</CModalTitle>
                    </CModalHeader>

                    <CModalBody>
                        <CRow>
                            <CCol xs={6}>
                                <h5>Name:</h5> {currentProperty?.propertyNickname || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Category:</h5> {currentProperty?.category || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Property Description:</h5> {currentProperty?.propertyDescription || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Instant Booking:</h5> {currentProperty?.instantBooking ? 'Yes' : 'No'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Min Price:</h5> {currentProperty?.priceRange || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Max Price:</h5> {currentProperty?.priceRange || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Guest Limit Per Day:</h5> {currentProperty?.guestLimitPerDay || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Guest Price Per Day:</h5> {currentProperty?.guestPricePerDay || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Cancellation Policy:</h5> {currentProperty?.cancellationPolicy || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Price Per Group Size:</h5>
                                <strong>Group Size:</strong> {currentProperty?.guests || 'N/A'} |
                                <strong>Price:</strong> {currentProperty?.price || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Location:</h5>
                                {currentProperty?.location?.address || 'N/A'},
                                {currentProperty?.location?.city || 'N/A'},
                                {currentProperty?.location?.state || 'N/A'},
                                {currentProperty?.location?.postalCode || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Acreage:</h5> {currentProperty?.acreage || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Guided Hunt:</h5> {currentProperty?.guidedHunt ? 'Yes' : 'No'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Lodging:</h5> {currentProperty?.lodging ? 'Yes' : 'No'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Shooting Range:</h5> {currentProperty?.shooting_range ? 'Yes' : 'No'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Optional Extended Details:</h5> {currentProperty?.extended_details || 'N/A'}
                            </CCol>
                            <CCol xs={6}>
                                <h5>Available Dates:</h5>
                                {availableDateRange?.from || 'N/A'} to {availableDateRange?.to || 'N/A'}
                            </CCol>
                        </CRow>
                    </CModalBody>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setViewModalVisible(false)}>
                            Close
                        </CButton>
                    </CModalFooter>
                </CModal>


            </CCard>
        </div>
    );
};
export default PropertyManagement;
