import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import './Dashboard.css';
import logo1 from './img/logo1.png'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CForm,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDate, setFilterDate] = useState(''); // State for filter date as string
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [events, setEvents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    if (editingIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingIndex] = {
        name: eventName,
        startTime,
        endTime,
        date: selectedDate.toDateString()
      };
      setEvents(updatedEvents);
      setEditingIndex(null);
    } else {
      const newEvent = {
        name: eventName,
        startTime,
        endTime,
        date: selectedDate.toDateString()
      };
      setEvents([...events, newEvent]);
    }
    // Reset form fields and hide modal
    setEventName('');
    setStartTime('');
    setEndTime('');
    setModalVisible(false);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    setEventName(events[index].name);
    setStartTime(events[index].startTime);
    setEndTime(events[index].endTime);
    setSelectedDate(new Date(events[index].date));
    setEditingIndex(index);
    setModalVisible(true);
  };

  // Filter events based on selected filter date
  const filteredEvents = filterDate
    ? events.filter(event => new Date(event.date).toDateString() === new Date(filterDate).toDateString())
    : events;

  return (
    <>
      <CRow className='xyz1'>
  <CCol xs={12}>
    <CCard className='xyz1-mini'>
      <CCardHeader style={{ padding: "15px" }}>
        <strong>Add Your Events from calendar</strong>
      </CCardHeader>
      <CCardBody>
        <div className="d-flex align-items-start">
          <div className="calendar-container">
            <Calendar onClickDay={handleDateClick} />
          </div>
          <img 
            src={logo1}
            alt="Logo"
            className="logo-img ms-3"
          />
        </div>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>


      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Event List</strong>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="form-control w-25"
              />
            </CCardHeader>

            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Event Name</CTableHeaderCell>
                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                    <CTableHeaderCell>End Time</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredEvents.map((event, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{event.name}</CTableDataCell>
                      <CTableDataCell>{event.startTime}</CTableDataCell>
                      <CTableDataCell>{event.endTime}</CTableDataCell>
                      <CTableDataCell>{event.date}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteEvent(index)}
                          className="me-2"
                        >
                          <FaTrash />
                        </CButton>
                        <CButton
                          color="warning"
                          onClick={() => handleEditEvent(index)}
                        >
                          <FaEdit />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal for adding/editing an event */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <h5>{editingIndex !== null ? 'Edit Event' : 'Add Event'}</h5>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-control"
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="warning" onClick={handleAddEvent}>
            {editingIndex !== null ? 'Update Event' : 'Add Event'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Dashboard;
