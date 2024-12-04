import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
} from '@coreui/react'
import { cilTrash, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify' // Import toastify
import 'react-toastify/dist/ReactToastify.css' // Import toast styles

const ReviewTable = () => {
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalReviews, setTotalReviews] = useState(0)
  const itemsPerPage = 10

  // Fetch reviews from the API
  // Correct the URL in the fetchReviews function

  const fetchReviews = async (page) => {
    const vendorId = localStorage.getItem('vendorId')
    try {
      
      const response = await axios.get('http://44.196.64.110:8000/review/getreviews', {
        params: {
          page,
          limit: itemsPerPage,
          vendorId,
        },
      })
      setReviews(response.data.data)
      setTotalReviews(response.data.total)
    } catch (error) {
      console.error('Error fetching reviews:', error) // Log the error
      toast.error('Failed to fetch reviews') // Show error toast
    }
  }

  // Delete a review by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://44.196.64.110:8000/review/delete/${id}`)
      setReviews(reviews.filter((review) => review._id !== id))
      toast.success('Review deleted successfully') // Show success toast
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Failed to delete review') // Show error toast
    }
  }

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      fetchReviews(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      fetchReviews(currentPage - 1)
    }
  }

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews(currentPage)
  }, [currentPage])

  // Calculate total pages
  const totalPages = Math.ceil(totalReviews / itemsPerPage)

  return (
    <>
      <CTable hover striped responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Property Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review By</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reviews.length > 0 ? (
            reviews?.map((review, index) => (
              <CTableRow key={review._id}>
                <CTableHeaderCell scope="row">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </CTableHeaderCell>
                <CTableDataCell>{review.property.propertyName}</CTableDataCell>
                <CTableDataCell>{review?.user?.fullName}</CTableDataCell>
                <CTableDataCell>{review.review}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => handleDelete(review._id)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>No Reviews found</CTableRow>
          )}
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

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  )
}

export default ReviewTable
