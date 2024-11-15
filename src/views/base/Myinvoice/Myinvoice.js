import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  CPagination,
  CPaginationItem,
  CFormInput,  // Updated import here
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react';

const VendorPayoutTable = () => {
  const [payouts, setPayouts] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorId, setVendorId] = useState(null);
  const [amountToCashout, setAmountToCashout] = useState(0);
  const [stripeAccountId, setStripeAccountId] = useState('');
  const [cashoutModalVisible, setCashoutModalVisible] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const storedVendorId = localStorage.getItem('vendorId');
    if (storedVendorId) {
      setVendorId(storedVendorId);
    }
  }, []);

  useEffect(() => {
    const fetchPayoutData = async () => {
      if (!vendorId) return;

      try {
        const response = await axios.get(`http://localhost:8000/payouts/getVendorPay/${vendorId}`);
        setPayouts(response.data.payouts);
        setRemainingAmount(response.data.remainingAmount);
        toast.success('Payout data fetched successfully!');
      } catch (error) {
        toast.error('Error fetching payout data!');
      }
    };

    fetchPayoutData();
  }, [vendorId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayouts = payouts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payouts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCashoutRequest = async () => {
    if (amountToCashout <= 0 || amountToCashout > remainingAmount || !stripeAccountId) {
      toast.error('Invalid input! Ensure the amount is correct and Stripe account ID is provided.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/payouts/cashoutRequest', {
        vendorId,
        amountRequested: amountToCashout,
        stripeAccountId
      });

      if (response.data.success) {
        toast.success('Cashout request successful!');
        setAmountToCashout(0);
        setStripeAccountId('');
        setCashoutModalVisible(false);
      } else {
        toast.error('Failed to request cashout!');
      }
    } catch (error) {
      toast.error('Error requesting cashout!');
    }
  };

  return (
    <>
      <ToastContainer />

      <CCard>
        <CCardHeader>Payout History</CCardHeader>
        <CCardBody>
          <div class="mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <h5>
              Remaining Amount: <CBadge color="info">${remainingAmount}</CBadge>
            </h5>
            <CButton
              color="primary"
              onClick={() => setCashoutModalVisible(true)}
            >
            Cashout
            </CButton>
          </div>
          <CTable hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount Paid</CTableHeaderCell>
                <CTableHeaderCell scope="col">Payment Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPayouts.length > 0 ? (
                currentPayouts.map((payout, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{indexOfFirstItem + index + 1}</CTableDataCell>
                    <CTableDataCell>${payout.amountPaid}</CTableDataCell>
                    <CTableDataCell>{new Date(payout.paymentDate).toLocaleDateString()}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="3" className="text-center">
                    No Payout History Found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          <CPagination className="mt-3" align="end">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </CPaginationItem>
            {[...Array(totalPages).keys()].map((page) => (
              <CPaginationItem
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>

      {/* Cashout Request Modal */}
      <CModal visible={cashoutModalVisible} onClose={() => setCashoutModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Request Cashout</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="number"
            value={amountToCashout}
            onChange={(e) => setAmountToCashout(e.target.value)}
            placeholder="Enter amount to cash out"
          />
          <CFormInput
            type="text"
            value={stripeAccountId}
            onChange={(e) => setStripeAccountId(e.target.value)}
            placeholder="Enter Stripe Account ID"
            className="mt-2"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCashoutModalVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleCashoutRequest}>
          Cashout Request
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VendorPayoutTable;
