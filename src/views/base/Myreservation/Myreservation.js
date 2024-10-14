import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);

  // Sample data for demonstration purposes
  const fetchReservations = () => {
    const sampleData = [
      { id: 1, animalName: 'Lion', date: '2024-10-14', price: 200 },
      { id: 2, animalName: 'Tiger', date: '2024-10-15', price: 250 },
      { id: 3, animalName: 'Elephant', date: '2024-10-16', price: 300 },
    ];
    setReservations(sampleData);
  };

  // Delete a reservation by ID
  const handleDelete = (id) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  const handleView = (id) => {
    console.log('View details for reservation:', id);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <CTable hover striped responsive>
      <CTableHead color="dark">
        <CTableRow>
          <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
          <CTableHeaderCell scope="col">Animal Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          <CTableHeaderCell scope="col">Price</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {reservations.map((reservation, index) => (
          <CTableRow key={reservation.id}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{reservation.animalName}</CTableDataCell>
            <CTableDataCell>{reservation.date}</CTableDataCell>
            <CTableDataCell>${reservation.price}</CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                variant="outline"
                onClick={() => handleView(reservation.id)}
              >
                View {/* Replace icon with simple text */}
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                onClick={() => handleDelete(reservation.id)}
                className="ms-2"
              >
                Delete {/* Replace icon with simple text */}
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default ReservationTable;
