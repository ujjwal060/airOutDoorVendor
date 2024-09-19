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
  const [vendors, setVendors] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewVendor((prev) => ({ ...prev, [name]: value }))
  }

  const addVendor = () => {
    if (editMode) {
      setVendors(
        vendors.map((vendor) =>
          vendor.id === selectedVendorId ? { id: vendor.id, ...newVendor } : vendor
        )
      )
    } else {
      setVendors([...vendors, { id: vendors.length + 1, ...newVendor }])
    }
    resetForm()
  }

  const resetForm = () => {
    setModalVisible(false)
    setEditMode(false)
    setSelectedVendorId(null)
    setNewVendor({ name: '', email: '', phone: '' }) // Reset the form
  }

  const deleteVendor = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id))
  }

  const updateVendor = (vendor) => {
    setNewVendor({ name: vendor.name, email: vendor.email, phone: vendor.phone })
    setSelectedVendorId(vendor.id)
    setEditMode(true)
    setModalVisible(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Vendors</strong>
            <CButton color="warning" className="float-end" onClick={() => setModalVisible(true)}>
              {editMode ? 'Edit Vendor' : 'Add Vendor'}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Vendor Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone No.</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendors.map((vendor) => (
                  <CTableRow key={vendor.id}>
                    <CTableHeaderCell scope="row">{vendor.id}</CTableHeaderCell>
                    <CTableDataCell>{vendor.name}</CTableDataCell>
                    <CTableDataCell>{vendor.email}</CTableDataCell>
                    <CTableDataCell>{vendor.phone}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => updateVendor(vendor)}
                        style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteVendor(vendor.id)}
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

      {/* Modal for adding/updating a vendor */}
      <CModal visible={modalVisible} onClose={resetForm}>
        <CModalHeader>{editMode ? 'Update Vendor' : 'Add Vendor'}</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Vendor Name"
              name="name"
              value={newVendor.name}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              label="Email"
              name="email"
              value={newVendor.email}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              label="Phone No."
              name="phone"
              value={newVendor.phone}
              onChange={handleInputChange}
              required
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={resetForm}>
            Cancel
          </CButton>
          <CButton color="warning" onClick={addVendor}>
            {editMode ? 'Update Vendor' : 'Add Vendor'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Tables
