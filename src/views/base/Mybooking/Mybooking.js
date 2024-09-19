import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Tables = () => {
  const [Bookings, setBookings] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)
  const [newBooking, setNewBooking] = useState({ name: '', email: '', phone: '' ,date: ''})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBooking((prev) => ({ ...prev, [name]: value }))
  }

  const addBooking = () => {
    if (editMode) {
      setBookings(
        Bookings.map((Booking) =>
          Booking.id === selectedBookingId ? { id: Booking.id, ...newBooking } : Booking
        )
      )
    } else {
      setBookings([...Bookings, { id: Bookings.length + 1, ...newBooking }])
    }
    resetForm()
  }

  const resetForm = () => {
    setModalVisible(false)
    setEditMode(false)
    setSelectedBookingId(null)
    setNewBooking({ name: '', email: '', phone: '' ,date: ''}) // Reset the form
  }

  const deleteBooking = (id) => {
    setBookings(Bookings.filter((Booking) => Booking.id !== id))
  }

  const updateBooking = (Booking) => {
    setNewBooking({ name: Booking.name, email: Booking.email, phone: Booking.phone, date: Booking.date })
    setSelectedBookingId(Booking.id)
    setEditMode(true)
    setModalVisible(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bookings</strong>
            <CButton color="warning" className="float-end" onClick={() => setModalVisible(true)}>
              {editMode ? 'Edit Booking' : 'Add Booking'}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Booking ID</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone No.</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Bookings.map((Booking) => (
                  <CTableRow key={Booking.id}>
                    <CTableHeaderCell scope="row">{Booking.id}</CTableHeaderCell>
                    <CTableDataCell>{Booking.name}</CTableDataCell>
                    <CTableDataCell>{Booking.email}</CTableDataCell>
                    <CTableDataCell>{Booking.phone}</CTableDataCell>
                    <CTableDataCell>{Booking.date}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => updateBooking(Booking)}
                        style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteBooking(Booking.id)}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal for adding/updating a Booking */}
      <CModal visible={modalVisible} onClose={resetForm}>
        <CModalHeader>{editMode ? 'Update Booking' : 'Add Booking'}</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Booking Name"
              name="name"
              value={newBooking.name}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              label="Email"
              name="email"
              value={newBooking.email}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              label="Phone No."
              name="phone"
              value={newBooking.phone}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              label="Date"
              name="date"
              value={newBooking.date}
              onChange={handleInputChange}
              required
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={resetForm}>
            Cancel
          </CButton>
          <CButton color="warning" onClick={addBooking}>
            {editMode ? 'Update Booking' : 'Add Booking'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Tables
