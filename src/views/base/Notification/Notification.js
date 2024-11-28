import React, { useEffect, useState } from "react";
import axios from "axios";
import { CButton, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CSpinner, CCard, CCardBody, CPagination, CPaginationItem, CNav, CNavItem, CNavLink } from "@coreui/react";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [tab, setTab] = useState("unread");

  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (vendorId) {
      fetchNotifications(tab, currentPage);
    }
  }, [vendorId, tab, currentPage]);

  const fetchNotifications = (type, page) => {
    setLoading(true);
    axios
      .post("http://44.196.64.110:8000/notification/getVendor", {
        vendorId,
        page,
        limit: 10,
        type,
      })
      .then((response) => {
        const filteredNotifications = response.data.notifications.filter((notification) => {
          const userRecipient = notification.vendorRecipients.find(
            (recipient) => recipient.vendorId === vendorId
          );
          return type === "unread" ? !userRecipient.isRead : userRecipient.isRead;
        });

        setNotifications(filteredNotifications);
        setTotalPages(response.data.totalPages);
        setTotalNotifications(filteredNotifications.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      });
  };

  const handleChangeRead = (id) => {
    axios
      .patch(`http://44.196.64.110:8000/notification/readVendor/${id}`, { vendorId })
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => {
            if (notification._id === id) {
              return {
                ...notification,
                recipients: notification.vendorRecipients.map((recipient) =>
                  recipient.vendorId === vendorId
                    ? { ...recipient, isRead: !recipient.isRead }
                    : recipient
                ),
              };
            }
            return notification;
          })
        );
        fetchNotifications(tab, currentPage);
      })
      .catch((error) => {
        console.error("Error toggling notification read status:", error);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(1);
  };

  return (
    <div className="notification">
      <div className="container mt-4">
        <CCard>
          <CCardBody>
            <h2 className="text-center mb-4">Your Notifications</h2>
            <CNav variant="tabs" className="mb-3">
              <CNavItem>
                <CNavLink
                  active={tab === "unread"}
                  onClick={() => handleTabChange("unread")}
                >
                  Unread
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={tab === "read"}
                  onClick={() => handleTabChange("read")}
                >
                  Read
                </CNavLink>
              </CNavItem>
            </CNav>
            {loading ? (
              <CSpinner color="primary" className="d-block mx-auto my-4" />
            ) : (
              <>
                <p className="text-center">
                  {tab === "unread"
                    ? `You have ${totalNotifications} unread notifications`
                    : `You have ${totalNotifications} read notifications`}
                </p>
                {notifications.length > 0 ? (
                  <CTable striped hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>Message</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {notifications.map((notification) => (
                        <CTableRow key={notification._id}>
                          <CTableDataCell>{notification.title}</CTableDataCell>
                          <CTableDataCell>{notification.body}</CTableDataCell>
                          <CTableDataCell>
                            {new Date(notification.timestamp).toLocaleString()}
                          </CTableDataCell>
                          <CTableDataCell>
                            {tab === "unread" ? (
                              <CButton
                                color="success"
                                size="sm"
                                onClick={() => handleChangeRead(notification._id)}
                              >
                                Mark as Read
                              </CButton>
                            ) : (
                              <span className="text-success">Read</span>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <p className="text-center">No notifications found</p>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>Total: {totalNotifications}</span>
                  <CPagination>
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                     &lt;
                    </CPaginationItem>
                    <span className="mx-3">{currentPage} of {totalPages}</span>
                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      &gt;
                    </CPaginationItem>
                  </CPagination>
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}

export default Notification;
