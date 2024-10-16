import React, { useState } from 'react';
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
} from '@coreui/react';
import { cilTrash, cilChevronLeft, cilChevronRight } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const FavouriteBookingsTable = () => {
  // Sample data for favourite bookings
  const bookingsData = [
    { id: 1, image: 'https://via.placeholder.com/100', productName: 'Product 1', price: '$100', status: 'Confirmed' },
    { id: 2, image: 'https://via.placeholder.com/100', productName: 'Product 2', price: '$150', status: 'Pending' },
    { id: 3, image: 'https://via.placeholder.com/100', productName: 'Product 3', price: '$200', status: 'Confirmed' },
    { id: 4, image: 'https://via.placeholder.com/100', productName: 'Product 4', price: '$120', status: 'Pending' },
    { id: 5, image: 'https://via.placeholder.com/100', productName: 'Product 5', price: '$300', status: 'Confirmed' },
    { id: 6, image: 'https://via.placeholder.com/100', productName: 'Product 6', price: '$90', status: 'Pending' },
    { id: 7, image: 'https://via.placeholder.com/100', productName: 'Product 7', price: '$220', status: 'Confirmed' },
    { id: 8, image: 'https://via.placeholder.com/100', productName: 'Product 8', price: '$110', status: 'Pending' },
    { id: 9, image: 'https://via.placeholder.com/100', productName: 'Product 9', price: '$400', status: 'Confirmed' },
    { id: 10, image: 'https://via.placeholder.com/100', productName: 'Product 10', price: '$250', status: 'Pending' },
    { id: 11, image: 'https://via.placeholder.com/100', productName: 'Product 11', price: '$320', status: 'Confirmed' },
    { id: 12, image: 'https://via.placeholder.com/100', productName: 'Product 12', price: '$450', status: 'Pending' },
  ];

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    // Display toast notification
    toast.success(`Booking with ID ${id} deleted!`);
  };

  // Get current bookings for pagination
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookingsData.slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(bookingsData.length / itemsPerPage);

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
              <CTableHeaderCell scope="col">Price</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentBookings.map((booking, index) => (
              <CTableRow key={booking.id}>
                {/* Serial Number */}
                <CTableDataCell>{indexOfFirstBooking + index + 1}</CTableDataCell>

                {/* Product Image */}
                <CTableDataCell>
                  <CImage
                    src={booking.image}
                    alt={booking.productName}
                    width="50"
                    height="50"
                    fluid
                  />
                </CTableDataCell>

                {/* Product Name */}
                <CTableDataCell>{booking.productName}</CTableDataCell>

                {/* Price */}
                <CTableDataCell>{booking.price}</CTableDataCell>

                {/* Status */}
                <CTableDataCell>
                  <CBadge
                    color={booking.status === 'Confirmed' ? 'success' : 'warning'}
                    style={{ width: '100px', textAlign: 'center', padding:"10px" }} // Equal width for badges
                  >
                    {booking.status}
                  </CBadge>
                </CTableDataCell>

                {/* Action Icons */}
                <CTableDataCell>
                  <CIcon
                    icon={cilTrash}
                    size="lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(booking.id)}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Centered Pagination */}
        <div className="d-flex justify-content-center">
          <CPagination aria-label="Page navigation" className="mt-3">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <CIcon icon={cilChevronLeft} />
            </CPaginationItem>
            {[...Array(totalPages)].map((_, page) => (
              <CPaginationItem
                key={page}
                active={page + 1 === currentPage}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <CIcon icon={cilChevronRight} />
            </CPaginationItem>
          </CPagination>
        </div>
      </CCardBody>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </CCard>
  );
};

export default FavouriteBookingsTable;
