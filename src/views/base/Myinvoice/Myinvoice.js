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
  CPagination,
  CPaginationItem,
  CButton,
} from '@coreui/react';
import { cilTrash, cilCloudDownload, cilChevronLeft, cilChevronRight } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const InvoiceTable = () => {
  // Sample invoice data
  const invoiceData = [
    { id: 1, date: '2024-09-01', status: 'Paid', invoiceUrl: '/path/to/invoice1.pdf' },
    { id: 2, date: '2024-09-03', status: 'Unpaid', invoiceUrl: '/path/to/invoice2.pdf' },
    { id: 3, date: '2024-09-05', status: 'Paid', invoiceUrl: '/path/to/invoice3.pdf' },
    { id: 4, date: '2024-09-07', status: 'Unpaid', invoiceUrl: '/path/to/invoice4.pdf' },
    { id: 5, date: '2024-09-10', status: 'Paid', invoiceUrl: '/path/to/invoice5.pdf' },
    { id: 6, date: '2024-09-12', status: 'Unpaid', invoiceUrl: '/path/to/invoice6.pdf' },
    { id: 7, date: '2024-09-15', status: 'Paid', invoiceUrl: '/path/to/invoice7.pdf' },
    { id: 8, date: '2024-09-17', status: 'Unpaid', invoiceUrl: '/path/to/invoice8.pdf' },
    { id: 9, date: '2024-09-20', status: 'Paid', invoiceUrl: '/path/to/invoice9.pdf' },
    { id: 10, date: '2024-09-22', status: 'Unpaid', invoiceUrl: '/path/to/invoice10.pdf' },
    { id: 11, date: '2024-09-25', status: 'Paid', invoiceUrl: '/path/to/invoice11.pdf' },
    { id: 12, date: '2024-09-27', status: 'Unpaid', invoiceUrl: '/path/to/invoice12.pdf' },
  ];

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    // Show toast notification
    toast.success(`Invoice with ID ${id} deleted!`);
  };

  const handleDownload = (url) => {
    window.open(url, '_blank'); // Opens the invoice PDF in a new tab
    // Show toast notification
    toast.info('Invoice downloaded successfully!');
  };

  // Get current invoices for pagination
  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
  const currentInvoices = invoiceData.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const totalPages = Math.ceil(invoiceData.length / itemsPerPage);

  return (
    <CCard>
      <CCardHeader>Invoices</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Invoice</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentInvoices.map((invoice, index) => (
              <CTableRow key={invoice.id}>
                {/* Serial Number */}
                <CTableDataCell>{indexOfFirstInvoice + index + 1}</CTableDataCell>

                {/* Invoice Date */}
                <CTableDataCell>{invoice.date}</CTableDataCell>

                {/* Status with Equal Button Size */}
                <CTableDataCell>
                  <CBadge
                    color={invoice.status === 'Paid' ? 'success' : 'warning'}
                    style={{ width: '80px', padding: '10px', textAlign: 'center' }}
                  >
                    {invoice.status}
                  </CBadge>
                </CTableDataCell>

                {/* Invoice Download Button */}
                <CTableDataCell>
                  <CButton
                    color="primary"
                    variant="ghost"
                    onClick={() => handleDownload(invoice.invoiceUrl)}
                  >
                    <CIcon icon={cilCloudDownload} /> Download
                  </CButton>
                </CTableDataCell>

                {/* Action (Delete) */}
                <CTableDataCell>
                  <CIcon
                    icon={cilTrash}
                    size="lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(invoice.id)}
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
      <ToastContainer /> {/* Toast Container for notifications */}
    </CCard>
  );
};

export default InvoiceTable;
