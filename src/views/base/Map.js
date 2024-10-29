import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CContainer, CRow, CCol } from '@coreui/react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios'; // Import Axios for API calls

const libraries = ['places'];

const AddressForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipcode: '',
    latitude: '',
    longitude: '',
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDknLyGZRHAWa4s5GuX5bafBsf-WD8wd7s", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = (place) => {
    const addressComponents = place.address_components;
    let city = '', state = '', zipcode = '', address = '';

    addressComponents.forEach((component) => {
      const types = component.types;
      if (types.includes("locality") || types.includes("sublocality")) {
        city = component.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (types.includes("postal_code")) {
        zipcode = component.long_name;
      }
      if (types.includes("street_address") || types.includes("route") || types.includes("neighborhood")) {
        address = `${address ? address + ', ' : ''}${component.long_name}`;
      }
    });

    // Ensure latitude and longitude are set correctly
    const lat = place.geometry?.location.lat();
    const lng = place.geometry?.location.lng();

    setFormData({
      address: address.trim(),
      city,
      state,
      zipcode,
      latitude: lat || '', // Set to empty string if undefined
      longitude: lng || '', // Set to empty string if undefined
    });
  };

  const handlePlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      handlePlaceSelect(place);
    } else {
      console.error("No geometry found for the selected place.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Submit the form data to your API endpoint
      await axios.post('http://localhost:8000/host/add', formData); // Replace with your actual endpoint
      console.log('Data submitted successfully:', formData); // Log success message

      // Clear the form data
      setFormData({
        address: '',
        city: '',
        state: '',
        zipcode: '',
        latitude: '',
        longitude: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error); // Log any errors
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CForm onSubmit={handleSubmit}>
            <h3>Address Form</h3>

            <div className="mb-3">
              <label>Address</label>
              <Autocomplete onLoad={(autocomplete) => autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete))}>
                <CFormInput
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </Autocomplete>
            </div>

            <CFormInput
              className="mb-3"
              type="text"
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <CFormInput
              className="mb-3"
              type="text"
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <CFormInput
              className="mb-3"
              type="text"
              label="ZIP Code"
              value={formData.zipcode}
              onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
            />

            <CButton color="primary" type="submit">Submit</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddressForm;
