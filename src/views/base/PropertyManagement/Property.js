import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CForm,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CButton,
    CSpinner,
    CFormCheck,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const ShopDetails = () => {
    const [newProperty, setNewProperty] = useState({
        address: '',
        latitude: '',
        longitude: '',
    });

    const autocompleteRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty({
            ...newProperty,
            [name]: value,
        });
    };

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
                        onChange={handleInputChange}
                        required
                        style={{ fontSize: '0.875rem', height: '2rem' }}
                    />
                </Autocomplete>
            </div>
        </LoadScript>
    );
};

export default ShopDetails;
