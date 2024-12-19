import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CPagination,
  CPaginationItem,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Tables = () => {
  const [Bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const vendorId = localStorage.getItem('vendorId')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Select Option');

  // Fetch bookings from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(
          `http://44.196.64.110:8000/booking/getBook/${vendorId}`,
        )
        console.log('booking', bookingsResponse)
        setBookings(bookingsResponse.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const handleDropdownItemClick = (option) => {
    setSelectedOption(option); // Update the selected option
    console.log(`Selected: ${option}`);
    setDropdownOpen(false); // Close the dropdown
  };

  // Delete a booking by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://44.196.64.110:8000/booking/delete/${id}`)
      setBookings(Bookings.filter((booking) => booking._id !== id))
    } catch (error) {
      console.error('Error deleting booking:', error)
      setError('Failed to delete booking')
    }
  }

  // Calculate current bookings for pagination
  const indexOfLastBooking = currentPage * rowsPerPage
  const indexOfFirstBooking = indexOfLastBooking - rowsPerPage
  const currentBookings = Bookings.slice(indexOfFirstBooking, indexOfLastBooking)

  // Pagination logic
  const totalPages = Math.ceil(Bookings.length / rowsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Bookings</strong>
              <CDropdown
                alignment="end"
                className="ms-2"
                visible={dropdownOpen}
                toggle={toggleDropdown}
              >
                <CDropdownToggle color="secondary" caret>
                  {selectedOption} {/* Display the selected option */}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => handleDropdownItemClick('Option 1')}>
                    Option 1
                  </CDropdownItem>
                  <CDropdownItem onClick={() => handleDropdownItemClick('Option 2')}>
                    Option 2
                  </CDropdownItem>
                  <CDropdownItem onClick={() => handleDropdownItemClick('Option 3')}>
                    Option 3
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCardHeader>

            <CCardBody>
              {loading ? (
                <CSpinner color="primary" />
              ) : error ? (
                <div className="text-danger">{error}</div>
              ) : (
                <CTable>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Check In</CTableHeaderCell>
                      <CTableHeaderCell>Check Out</CTableHeaderCell>
                      <CTableHeaderCell>Guests</CTableHeaderCell>
                      <CTableHeaderCell>Admin Commission</CTableHeaderCell>
                      <CTableHeaderCell>Your Amount</CTableHeaderCell>
                      <CTableHeaderCell>Total Price</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentBookings.length > 0 ? (
                      currentBookings.map((Booking, index) => (
                        <CTableRow key={Booking._id}>
                          <CTableHeaderCell scope="row">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </CTableHeaderCell>
                          <CTableDataCell>{Booking?.userId?.fullName}</CTableDataCell>
                          <CTableDataCell>
                            {new Date(Booking.checkInDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(Booking.checkOutDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>{Booking.guests}</CTableDataCell>
                          <CTableDataCell>
                            {Booking?.adminAmount ? '$' + Booking?.adminAmount : ''}
                          </CTableDataCell>
                          <CTableDataCell>
                            {Booking?.vendorAmount ? '$' + Booking?.vendorAmount : ''}
                          </CTableDataCell>
                          <CTableDataCell>{'$' + Booking.totalAmount}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={8} className="text-center">
                          No bookings found
                        </CTableDataCell>
                      </CTableRow>
                    )}
                    {currentBookings.length > 0 && (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="text-end fw-bold">
                          Total:
                        </CTableDataCell>
                        <CTableDataCell>
                          {'$' +
                            currentBookings
                              .reduce(
                                (total, Booking) => total + (parseFloat(Booking.adminAmount) || 0),
                                0,
                              )
                              .toFixed(2)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {'$' +
                            currentBookings
                              .reduce(
                                (total, Booking) => total + (parseFloat(Booking.vendorAmount) || 0),
                                0,
                              )
                              .toFixed(2)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {'$' +
                            currentBookings
                              .reduce(
                                (total, Booking) => total + (parseFloat(Booking.totalAmount) || 0),
                                0,
                              )
                              .toFixed(2)}
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Pagination */}
      <CPagination
        aria-label="Page navigation example"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <CPaginationItem disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          &laquo;
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem
            key={index + 1}
            style={{ cursor: 'pointer' }}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default Tables
