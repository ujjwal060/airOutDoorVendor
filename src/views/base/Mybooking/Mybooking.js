import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
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
  CBreadcrumb,
  CBreadcrumbItem
} from '@coreui/react'
import axios from 'axios'

const Tables = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [propertyName, setPropertyName] = useState('')
  const vendorId = localStorage.getItem('vendorId')
  const [propertyId, setPropertyId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const bookingsResponse = await axios.post(
          'http://44.196.64.110:8000/booking/getBook',
          { vendorId, propertyId }
        )
        setBookings(bookingsResponse.data)
        if (propertyId) {
          const property = bookingsResponse.data.find(
            (booking) => booking.propertyId === propertyId
          )
          setPropertyName(property?.propertyName)
        }
      } catch (error) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [propertyId])

  const indexOfLastBooking = currentPage * rowsPerPage
  const indexOfFirstBooking = indexOfLastBooking - rowsPerPage
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking)

  const totalPages = Math.ceil(bookings.length / rowsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handlePropertyClick = (id) => {
    setPropertyId(id)
    setCurrentPage(1)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CBreadcrumb>
            <CBreadcrumbItem
              active={!propertyId}
              onClick={() => setPropertyId(null)}
              style={{ cursor: 'pointer' }}
            >
              All Properties
            </CBreadcrumbItem>

            {propertyId && (
              <CBreadcrumbItem active>
                <span>&gt; {propertyName}</span>
              </CBreadcrumbItem>
            )}
          </CBreadcrumb>
          <CCard className="mb-4">
            <CCardBody>
              {loading ? (
                <CSpinner color="primary" />
              ) : error ? (
                <div className="text-danger">{error}</div>
              ) : (
                <CTable>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>S.No</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Property</CTableHeaderCell>
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
                      currentBookings.map((booking, index) => (
                        <CTableRow key={booking._id}>
                          <CTableHeaderCell scope="row">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </CTableHeaderCell>
                          <CTableDataCell>{booking?.userName}</CTableDataCell>
                          <CTableDataCell
                            style={{
                              cursor: 'pointer',
                              color: 'blue',
                              textDecoration: 'underline',
                            }}
                            onClick={() => handlePropertyClick(booking.propertyId)}
                          >
                            {booking?.propertyName}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(booking.checkInDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(booking.checkOutDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>{booking.guests}</CTableDataCell>
                          <CTableDataCell>
                            {booking?.adminAmount ? `$${booking.adminAmount}` : ''}
                          </CTableDataCell>
                          <CTableDataCell>
                            {booking?.vendorAmount ? `$${booking.vendorAmount}` : ''}
                          </CTableDataCell>
                          <CTableDataCell>{`$${booking.totalAmount}.00`}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={9} className="text-center">
                          No bookings found
                        </CTableDataCell>
                      </CTableRow>
                    )}
                    {currentBookings.length > 0 && (
                      <CTableRow>
                        <CTableDataCell colSpan={6} className="text-end fw-bold">
                          Total:
                        </CTableDataCell>
                        <CTableDataCell className="fw-bold">
                          {`$${currentBookings
                            .reduce(
                              (total, booking) => total + (parseFloat(booking.adminAmount) || 0),
                              0
                            )
                            .toFixed(2)}`}
                        </CTableDataCell>
                        <CTableDataCell className="fw-bold">
                          {`$${currentBookings
                            .reduce(
                              (total, booking) => total + (parseFloat(booking.vendorAmount) || 0),
                              0
                            )
                            .toFixed(2)}`}
                        </CTableDataCell>
                        <CTableDataCell className="fw-bold">
                          {`$${currentBookings
                            .reduce(
                              (total, booking) => total + (parseFloat(booking.totalAmount) || 0),
                              0
                            )
                            .toFixed(2)}`}
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
