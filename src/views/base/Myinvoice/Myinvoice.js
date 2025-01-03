import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CSpinner,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { cilBank } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'

const Account = () => {
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [accountStatus, setAccountStatus] = useState(false)
  const [bankAccountDetails, setBankAccountDetails] = useState([])
  const [paymentDetails, setPaymentDetails] = useState()
  const [payoutSummary, setpayoutSummary] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: null,
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [cashoutDetails, setCashoutDetails] = useState({})
  const [pendingRequests, setPendingRequests] = useState(null)

  const vendorId = localStorage.getItem('vendorId')

  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        setIsFetching(true)
        const response = await axios.get(
          `http://44.196.64.110:8000/payouts/getAccountStatus/${vendorId}`,
        )
        setAccountStatus(response.data.accountStatus)
        setBankAccountDetails(response.data.bankAccountDetails || [])
      } catch (error) {
        console.error('Error fetching account status:', error)
      } finally {
        setIsFetching(false)
      }
    }
    fetchAccountStatus()
    fetchPaymentDetails()
    fetchPayoutSummary()
  }, [vendorId])

  const handleCashoutClick = () => {
    if(pendingRequests){
        console.log("already requests are pending")
        alert("Request Already Pending")
        return
    }
    const remainingAmount = payoutSummary?.remainingAmount?.toFixed(2)
    const commissionAmount = payoutSummary?.adminCommission?.toFixed(2)
    const requestedAmount = (remainingAmount - commissionAmount).toFixed(2)

    setCashoutDetails({
      remainingAmount: parseFloat(remainingAmount),
      commissionAmount: parseFloat(commissionAmount),
      requestedAmount: parseFloat(requestedAmount),
    })

    setModalVisible(true)
  }

  const handleConfirmCashout = async () => {
    try {
      setLoading(true)
      const { remainingAmount, commissionAmount, requestedAmount } = cashoutDetails
      const response = await axios.post('http://44.196.64.110:8000/payouts/cashoutRequest', {
        vendorId,
        remainingAmount,
        requestedAmount,
        commissionAmount,
      })
      setLoading(false)
      setModalVisible(false)
      fetchPaymentDetails()
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const fetchPaymentDetails = async () => {
    try {
      setIsFetching(true)
      const response = await axios.get(`http://44.196.64.110:8000/payouts/getVendorPay/${vendorId}`)
      const formattedCashoutRequests = response.data.cashoutRequests.map((request) => {
        const formattedRequestDate = new Date(request.requestDate).toLocaleDateString('en-GB')
        const formattedPaymentDate = request.paymentDate
          ? new Date(request.paymentDate).toLocaleDateString('en-GB')
          : '-- -- --'
        return {
          ...request,
          requestDate: formattedRequestDate,
          paymentDate: formattedPaymentDate,
        }
      })
      const pendingRequests = formattedCashoutRequests.filter(
        (request) => request.status === 'pending',
      )

      console.log('Pending Requests:', pendingRequests.length)
      setPendingRequests(pendingRequests.length)
      setPaymentDetails(formattedCashoutRequests)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchPayoutSummary = async () => {
    try {
      const res = await axios.get(
        `http://44.196.64.110:8000/payouts/getVendorPaySummary/${vendorId}`,
      )
      setpayoutSummary(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const dobDay = formData.dob?.getDate()
    const dobMonth = formData.dob?.getMonth() + 1
    const dobYear = formData.dob?.getFullYear()
    try {
      const response = await axios.post('http://44.196.64.110:8000/payouts/addAccount', {
        vendorId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dobDay,
        dobMonth,
        dobYear,
        addressLine1: formData.addressLine1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      })
      if (response.data.accountLink) {
        setFormData('')
        window.open(response.data.accountLink, '_blank')
      } else {
        console.error('No accountLink received in the response')
      }
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message)
    } finally {
      setLoading(false)
    }
  }

  const goToStripe = async () => {
    try {
      const response = await axios.get(
        `http://44.196.64.110:8000/payouts/generateLoginLink/${vendorId}`,
      )
      window.open(response.data.url, '_blank')
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message)
    }
  }

  if (isFetching) {
    return <CSpinner />
  }

  return (
    <div>
      {!accountStatus ? (
        <CForm onSubmit={handleSubmit}>
          <CRow>
            {/* First Name and Last Name Side by Side */}
            <CCol md={6}>
              <CFormLabel>First Name</CFormLabel>
              <CFormInput
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Last Name</CFormLabel>
              <CFormInput
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          {/* Date of Birth with Calendar */}
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select your birthdate"
              className="form-control date-picker"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              showMonthDropdown
              required
            />
          </div>
          {/* Address Fields */}
          <CRow>
            <CCol md={6}>
              <CFormLabel>Address Line 1</CFormLabel>
              <CFormInput
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>City</CFormLabel>
              <CFormInput
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <CFormLabel>State</CFormLabel>
              <CFormInput
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>Postal Code</CFormLabel>
              <CFormInput
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          <CButton color="primary" type="submit" disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Submit'}
          </CButton>
        </CForm>
      ) : (
        <div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex flex-row gap-2 justify-content-between align-items-center">
                <div className="d-flex flex-row gap-3 align-items-center">
                  <CIcon icon={cilBank} height={32} width={32} />
                  <div className="d-flex flex-column gap-1 align-items-start">
                    <h6 className="mb-0">{bankAccountDetails[0]?.bankName}</h6>
                    <div className="d-flex flex-row gap-2 align-items-center">
                      <span className="text-muted fs-6">**** {bankAccountDetails[0]?.last4}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h6
                    onClick={goToStripe}
                    className="mb-0"
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                      textDecoration: 'underline',
                    }}
                  >
                    Go To Stripe :
                    <br />
                    {bankAccountDetails[0].StripeAccountId}
                  </h6>{' '}
                </div>
                <div>
                  <CTable
                    striped
                    bordered
                    hover
                    responsive
                    style={{ textAlign: 'center', margin: ' auto', maxWidth: '800px' }}
                  >
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell>Total Amt.</CTableHeaderCell>
                        <CTableHeaderCell>Paid Amt.</CTableHeaderCell>
                        <CTableHeaderCell>Rem. Amt.</CTableHeaderCell>
                        <CTableHeaderCell>Admin Commission</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>
                          ${payoutSummary?.totalAmount?.toFixed(2) || '0.00'}
                        </CTableDataCell>
                        <CTableDataCell>
                          ${payoutSummary?.totalPaidOut?.toFixed(2) || '0.00'}
                        </CTableDataCell>
                        <CTableDataCell>
                          ${payoutSummary?.remainingAmount?.toFixed(2) || '0.00'}
                        </CTableDataCell>
                        <CTableDataCell>
                          ${payoutSummary?.adminCommission?.toFixed(2) || '0.00'}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Heading Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3>Cashout Details</h3>
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
                onClick={handleCashoutClick}
              >
                Cashout
              </button>
            </div>

            {/* Table Section */}
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Remaining Amnt</CTableHeaderCell>
                  <CTableHeaderCell>Commission Amnt</CTableHeaderCell>
                  <CTableHeaderCell>Requested Amnt</CTableHeaderCell>
                  <CTableHeaderCell>Payment Status</CTableHeaderCell>
                  <CTableHeaderCell>Requested Date</CTableHeaderCell>
                  <CTableHeaderCell>Payment Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paymentDetails && paymentDetails.length > 0 ? (
                  paymentDetails.map((request, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{request.remainingAmount}</CTableDataCell>
                      <CTableDataCell>{request.adminCommissionDeducted}</CTableDataCell>
                      <CTableDataCell>{request.amountRequested}</CTableDataCell>
                      <CTableDataCell>{request.status}</CTableDataCell>
                      <CTableDataCell>{request.requestDate}</CTableDataCell>
                      <CTableDataCell>{request.paymentDate}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      No payment details available.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </div>
        </div>
      )}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader>Cashout Confirmation</CModalHeader>
        <CModalBody>
          <p>
            <strong>Remaining Amount:</strong> ${cashoutDetails.remainingAmount}
          </p>
          <p>
            <strong>Commission Amount:</strong> ${cashoutDetails.commissionAmount}
          </p>
          <p>
            <strong>Requested Amount:</strong> ${cashoutDetails.requestedAmount}
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleConfirmCashout} disabled={loading}>
            {loading ? <CSpinner component="span" size="sm" aria-hidden="true" /> : 'Confirm'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Account
