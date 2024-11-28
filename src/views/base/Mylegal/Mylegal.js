import React, { useState } from 'react';
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
import { CIcon } from '@coreui/icons-react'; // Import CIcon from icons-react
import { cilChevronLeft, cilChevronRight } from '@coreui/icons'; // Import specific icons
import { useNavigate } from 'react-router-dom';

const PayoutTable = () => {
  const navigate = useNavigate();

  const payoutData = [
    { id: 1, date: '2024-10-01', amount: '$1000', status: 'Completed' },
    { id: 2, date: '2024-10-02', amount: '$2000', status: 'Pending' },
    { id: 3, date: '2024-10-03', amount: '$1500', status: 'Completed' },
    { id: 4, date: '2024-10-04', amount: '$1200', status: 'Completed' },
    { id: 5, date: '2024-10-05', amount: '$800', status: 'Pending' },
    { id: 6, date: '2024-10-06', amount: '$3000', status: 'Completed' },
    { id: 7, date: '2024-10-07', amount: '$1500', status: 'Completed' },
    { id: 8, date: '2024-10-08', amount: '$200', status: 'Pending' },
    { id: 9, date: '2024-10-09', amount: '$500', status: 'Completed' },
    { id: 10, date: '2024-10-10', amount: '$900', status: 'Completed' },
    { id: 11, date: '2024-10-11', amount: '$700', status: 'Pending' },
    { id: 12, date: '2024-10-12', amount: '$1100', status: 'Completed' },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = payoutData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <CCard>
      <CCardHeader className='d-flex justify-content-between'>
        <h4>Payout Information</h4>
        <CButton color="warning" onClick={handleW9Click}>
          Add W9 Form
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable striped bordered hover responsive>
          <thead>
            <CTableRow>
              <CTableHeaderCell>S.No</CTableHeaderCell> {/* New header for Serial No */}
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>W9 Information</CTableHeaderCell>
            </CTableRow>
          </thead>
          <CTableBody>
            {currentItems.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{startIndex + index + 1}</CTableDataCell> {/* Automatic Serial Number */}
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>{item.amount}</CTableDataCell>
                <CTableDataCell>{item.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" onClick={handleW9Click}>
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
      </CCardBody>
    </CCard>
  );
};

export default PayoutTable;
