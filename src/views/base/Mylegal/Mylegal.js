import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilChevronLeft, cilChevronRight } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PayoutTable = () => {
  const navigate = useNavigate();

  const [payoutData, setPayoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const vendorId = localStorage.getItem('vendorId');
    const fetchPayoutData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pdf/get/${vendorId}`);
        console.log(response.data.data);
        
        setPayoutData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchPayoutData();
  }, []);

  const totalPages = Math.ceil(payoutData.length / itemsPerPage);

  const handleW9Click = () => {
    navigate('/w9');
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = payoutData.slice(startIndex, startIndex + itemsPerPage);

  const handleViewClick = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  return (
    <CCard>
      <CCardHeader className='d-flex justify-content-between'>
        <h4>Payout Information</h4>
        <CButton color="warning" onClick={handleW9Click}>
          Add W9 Form
        </CButton>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <CTable striped bordered hover responsive>
              <thead>
                <CTableRow>
                  <CTableHeaderCell>S.No</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>W9 Information</CTableHeaderCell>
                </CTableRow>
              </thead>
              <CTableBody>
                {payoutData.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                    <CTableDataCell>{new Date(item.date).toLocaleDateString()}</CTableDataCell> {/* Format date */}
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => handleViewClick(item.pdfLink)}>
                        View
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Centered Pagination controls */}
            <CPagination aria-label="Page navigation" className="justify-content-center">
              <CPaginationItem onClick={handlePreviousPage} disabled={currentPage === 1}>
                <CIcon icon={cilChevronLeft} />
              </CPaginationItem>

              <CPaginationItem active>{currentPage}</CPaginationItem>

              <CPaginationItem onClick={handleNextPage} disabled={currentPage === totalPages}>
                <CIcon icon={cilChevronRight} />
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  );
};

export default PayoutTable;
