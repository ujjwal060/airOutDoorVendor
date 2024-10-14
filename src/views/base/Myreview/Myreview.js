import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { cilTrash, cilChevronLeft, cilChevronRight } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0); // Track total reviews from API
  const itemsPerPage = 10;

  // Fetch reviews from the API
  const fetchReviews = async (page) => {
    try {
      const response = await axios.get('http://localhost:8000/review/getreviews', {
        params: {
          page,
          limit: itemsPerPage,
        },
      });
      setReviews(response.data.data); // Adjust according to your API response structure
      setTotalReviews(response.data.total); // Set total reviews from API response
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Delete a review by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/review/delete/${id}`); // Make sure the endpoint is correct
      setReviews(reviews.filter((review) => review._id !== id)); // Use _id if that’s your primary key
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchReviews(currentPage + 1); // Fetch new page of reviews
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchReviews(currentPage - 1); // Fetch new page of reviews
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalReviews / itemsPerPage);

  return (
    <>
      <CTable hover striped responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reviews.map((review, index) => (
            <CTableRow key={review._id}>
              <CTableHeaderCell scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
              <CTableDataCell>{review.name}</CTableDataCell>
              <CTableDataCell>{review.email}</CTableDataCell>
              <CTableDataCell>{review.review}</CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" variant="outline" onClick={() => handleDelete(review._id)}>
                  <CIcon icon={cilTrash} />
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
  );
};

export default ReviewTable;
