import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CImage,
  CPagination,
  CPaginationItem,
  CButton,
} from '@coreui/react';
import { cilTrash, cilChevronLeft, cilChevronRight } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import axios from 'axios';

const FavouriteBookingsTable = () => {
  const [favProperties,setProperties]=useState([])
  const [favorites, setFavorites] = useState(
    favProperties.reduce((acc, property) => {
      acc[property._id] = property.isFavorite || false // assuming you have a `isFavorite` property
      return acc
    }, {}),
  )
  

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // const handleDelete = (id) => {
  //   // Display toast notification
  //   toast.success(`Booking with ID ${id} deleted!`);
  // };
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`http://18.209.197.35:8000/property/get/${vendorId}`)
      setProperties(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching properties:', error)
      setProperties([])
    }
  }
  const handleToggle = async (propertyId) => {
    const newFavoriteStatus = !favorites[propertyId] // Toggle the status

    try {
      // Make API call to mark as favorite
      const res = await axios.post('http://18.209.197.35:8000/property/favorite', {
        propertyId,
        isFavorite: newFavoriteStatus,
      })
      console.log('responce after favorite', res)
      toast.success(res.data.message)
      fetchProperties()
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [propertyId]: newFavoriteStatus,
      }))
    } catch (error) {
      console.error('Error updating favorite status', error)
    }
  }

  const fetchFavoriteProperties = async () => {
    try {
      const response = await axios.get('http://18.209.197.35:8000/property/getfavorite')
  
      if (response.status === 200) {
        setProperties(response.data.favProperty || []) // Assuming the response contains an array of favorites
        console.log(response.data.favProperty)
        toast.success('Favorite properties loaded successfully')
      } else {
        toast.error('Failed to load favorite properties')
      }
    } catch (error) {
      console.error('Error fetching favorite properties:', error)
      toast.error('Error fetching favorite properties')
    }
  }
  

useEffect(()=>{
  fetchFavoriteProperties()
},[])

  return (
    <CCard>
      <CCardHeader>My Favourite Bookings</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {favProperties.map((booking, index) => (
              <CTableRow key={booking._id}>
               
                {/* <CTableDataCell>{indexOfFirstBooking + index + 1}</CTableDataCell> */}
                <CTableDataCell>{index+1}</CTableDataCell>
                <CTableDataCell>
                  <CImage
                    src={booking.images[0]}
                    alt={booking.productName}
                    width="50"
                    height="50"
                    fluid
                  />
                </CTableDataCell>

                <CTableDataCell>{booking.propertyName}</CTableDataCell>

                <CTableDataCell>{booking.propertyDescription}</CTableDataCell>

                <CTableDataCell>
                      <CButton
                        color={booking.isFavorite ? 'success' : 'secondary'}
                        onClick={() => handleToggle(booking._id)}
                        style={{
                          width: '40px',
                          borderRadius: '20px',
                          display: 'flex',
                          justifyContent: booking.isFavorite ? 'flex-end' : 'flex-start',
                          alignItems: 'center',
                          padding: '2px',
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
                    </CTableDataCell>

                {/* <CTableDataCell>
                  <CIcon
                    icon={cilTrash}
                    size="lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(booking.id)}
                  />
                </CTableDataCell> */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

       
      </CCardBody>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </CCard>
  );
};

export default FavouriteBookingsTable;
