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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const InboxTable = () => {
  // Sample inbox data
  const [inboxData, setInboxData] = useState([
    { id: 1, subject: 'Meeting Reminder', sender: 'Alice', date: '2024-10-01', status: 'Pending', details: 'Meeting at 10 AM in the conference room.' },
    { id: 2, subject: 'Project Update', sender: 'Bob', date: '2024-10-02', status: 'Completed', details: 'Project deadline extended by two weeks.' },
    { id: 3, subject: 'New Assignment', sender: 'Charlie', date: '2024-10-03', status: 'Pending', details: 'Please check your email for new tasks.' },
    { id: 4, subject: 'Invoice Due', sender: 'David', date: '2024-10-04', status: 'Completed', details: 'Invoice #12345 is due next week.' },
    { id: 5, subject: 'Team Outing', sender: 'Eve', date: '2024-10-05', status: 'Pending', details: 'Join us for a team outing on Saturday!' },
    { id: 6, subject: 'Feedback Request', sender: 'Frank', date: '2024-10-06', status: 'Completed', details: 'Please provide feedback on the recent project.' },
    { id: 7, subject: 'Weekly Summary', sender: 'Grace', date: '2024-10-07', status: 'Pending', details: 'Summary of last week’s work and next steps.' },
    { id: 8, subject: 'Support Ticket', sender: 'Hank', date: '2024-10-08', status: 'Completed', details: 'Your support ticket has been resolved.' },
    { id: 9, subject: 'Security Alert', sender: 'Ivy', date: '2024-10-09', status: 'Pending', details: 'Security alert: Update your password.' },
    { id: 10, subject: 'Newsletter', sender: 'Jack', date: '2024-10-10', status: 'Completed', details: 'Check out our latest newsletter.' },
  ]);

  // Pagination states
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get current inbox messages for pagination
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = inboxData.slice(indexOfFirstMessage, indexOfLastMessage);

  const totalPages = Math.ceil(inboxData.length / itemsPerPage);

  const handleDelete = (id) => {
    const updatedInbox = inboxData.filter(message => message.id !== id);
    setInboxData(updatedInbox);
    toast.success(`Message with ID ${id} deleted!`);
  };

  const handleView = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const toggleStatus = (id) => {
    const updatedInbox = inboxData.map(message => {
      if (message.id === id) {
        return { ...message, status: message.status === 'Pending' ? 'Completed' : 'Pending' };
      }
      return message;
    });
    setInboxData(updatedInbox);
    toast.success(`Status updated for message ID ${id} to ${updatedInbox.find(m => m.id === id).status}!`);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMessage(null);
  };

  return (
    <CCard>
      <CCardHeader>Inbox</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
              <CTableHeaderCell scope="col">Sender</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentMessages.map((message, index) => (
              <CTableRow key={message.id}>
                <CTableDataCell>{indexOfFirstMessage + index + 1}</CTableDataCell>
                <CTableDataCell>{message.subject}</CTableDataCell>
                <CTableDataCell>{message.sender}</CTableDataCell>
                <CTableDataCell>{message.date}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={message.status === 'Completed' ? 'success' : 'warning'} style={{padding:"10px"}}>
                    {message.status}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" variant="ghost" onClick={() => handleView(message)}>
                    <FontAwesomeIcon icon={faEye} />
                  </CButton>
                  <CButton color="danger" variant="ghost" onClick={() => handleDelete(message.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </CButton>
                  <CButton color="warning" variant="ghost" onClick={() => toggleStatus(message.id)}>
                    {message.status === 'Pending' ? 'Complete' : 'Undo'}
                  </CButton>
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
              <FontAwesomeIcon icon={faChevronLeft} />
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
              <FontAwesomeIcon icon={faChevronRight} />
            </CPaginationItem>
          </CPagination>
        </div>
      </CCardBody>

      {/* Modal for Viewing Message Details */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader onClose={closeModal}>
          <CModalTitle>Message Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedMessage && (
            <div className="row">
              <div className="col-6">
                <div style={{ padding: '10px', fontSize: '16px', fontWeight: 'normal' }}>
                  <strong>Subject:</strong> <br />
                  <strong>Sender:</strong> <br />
                  <strong>Date:</strong><br />
                  <strong>Details:</strong>
                </div>
              </div>
              <div className="col-6">
                <div style={{ fontWeight: 'normal' }}>
                {selectedMessage.subject}
                </div>
                <div style={{  fontWeight: 'normal' }}>
                {selectedMessage.sender}
                </div>
                <div style={{ fontWeight: 'normal' }}>
                {selectedMessage.date}
                </div>
                <div style={{ fontWeight: 'normal' }}>
                  {selectedMessage.details}
                </div>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default InboxTable;
