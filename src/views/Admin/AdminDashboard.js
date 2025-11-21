import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config'; 

import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
  CSpinner,
  CAlert
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { cilStore, cilCheckCircle, cilX, cilInfo } from '@coreui/icons';
import axios from 'axios';
import { format } from 'date-fns';

const styles = {
  cardContainer: {
    marginBottom: '20px',
  },
  cardBase: {
    padding: '10px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    borderLeft: '5px solid',
    backgroundColor: '#f0f9ff',
  },
  count: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '5px',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  },
  franchise: {
    borderLeftColor: '#00bfff',
    backgroundColor: '#e6f7ff',
  },
  customer: {
    borderLeftColor: '#9254de',
    backgroundColor: '#f9f0ff',
  },
  menu: {
    borderLeftColor: '#faad14',
    backgroundColor: '#fffbe6',
  },
  request: {
    borderLeftColor: '#ff4d4f',
    backgroundColor: '#fff1f0',
  },
  badgePending: {
    backgroundColor: '#faad14',
    color: 'white',
  },
  badgeApproved: {
    backgroundColor: '#52c41a',
    color: 'white',
  },
  badgeRejected: {
    backgroundColor: '#ff4d4f',
    color: 'white',
  },
};

const AdminDashboard = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [franchiseRequests, setFranchiseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchFranchiseRequests();
  }, []);

  const fetchFranchiseRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/franchise/requests/`);
      setFranchiseRequests(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch franchise requests. Please try again later.");
      console.error("Error fetching franchise requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const mergeStyles = (...args) => Object.assign({}, ...args);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/franchise/requests/${id}/status/approved`);
      setSuccess('Franchise request approved successfully');
      fetchFranchiseRequests();
    } catch (err) {
      setError("Failed to approve request. Please try again.");
      console.error("Error approving request:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/franchise/requests/${id}/status/rejected`);
      setSuccess('Franchise request rejected successfully');
      fetchFranchiseRequests();
    } catch (err) {
      setError("Failed to reject request. Please try again.");
      console.error("Error rejecting request:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <CBadge style={styles.badgePending}>Pending</CBadge>;
      case 'approved':
        return <CBadge style={styles.badgeApproved}>Approved</CBadge>;
      case 'rejected':
        return <CBadge style={styles.badgeRejected}>Rejected</CBadge>;
      default:
        return <CBadge>Unknown</CBadge>;
    }
  };

  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setVisible(true);
  };

  return (
    <>
      {error && <CAlert color="danger" dismissible onClose={() => setError(null)}>{error}</CAlert>}
      {success && <CAlert color="success" dismissible onClose={() => setSuccess(null)}>{success}</CAlert>}

      <CRow style={styles.cardContainer}>
        {[
          { title: 'Total Franchises', count: 12, note: 'Franchise branches', style: styles.franchise },
          { title: 'Total Customers', count: 48, note: 'All active customers', style: styles.customer },
          { title: 'Menu Items', count: 28, note: 'Available menus', style: styles.menu },
          { 
            title: 'Franchise Requests', 
            count: loading ? '...' : franchiseRequests.filter(r => r.request_status === 'pending').length, 
            note: 'Pending approval', 
            style: styles.request 
          },
        ].map((item, i) => (
          <CCol xs={12} md={3} key={i}>
            <CCard
              style={mergeStyles(
                styles.cardBase,
                item.style,
                hoveredCard === i ? styles.cardHover : {}
              )}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CCardBody>
                <CCardTitle>{item.title}</CCardTitle>
                <div style={styles.count}>{item.count}</div>
                <small>{item.note}</small>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardBody>
              <CCardTitle className="fs-4 fw-semibold">Latest Franchise Requests</CCardTitle>
              {loading ? (
                <div className="text-center py-5">
                  <CSpinner color="primary" />
                  <p className="mt-2">Loading franchise requests...</p>
                </div>
              ) : franchiseRequests.length === 0 ? (
                <div className="text-center py-5">
                  <h4>No franchise requests found</h4>
                </div>
              ) : (
                <CTable align="middle" className="mb-0" hover responsive>
                  <CTableHead className="fw-semibold text-body-secondary">
                    <CTableRow>
                      <CTableHeaderCell>Applicant</CTableHeaderCell>
                      <CTableHeaderCell>Location</CTableHeaderCell>
                      <CTableHeaderCell>Budget</CTableHeaderCell>
                      <CTableHeaderCell>Submitted</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {franchiseRequests.map((request) => (
                      <CTableRow key={request.id}>
                        <CTableDataCell>
                          <strong>{request.user_name}</strong>
                          <div className="small text-medium-emphasis">{request.user_email}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {request.requested_city}, {request.requested_country}
                        </CTableDataCell>
                        <CTableDataCell>
                          ${request.investment_budget.toLocaleString()}
                        </CTableDataCell>
                        <CTableDataCell>
                          {format(new Date(request.created_at), 'MMM dd, yyyy')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {getStatusBadge(request.request_status)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color="info" 
                            size="sm" 
                            className="me-2"
                            onClick={() => viewRequestDetails(request)}
                          >
                            <CIcon icon={cilInfo} /> Details
                          </CButton>
                          {request.request_status === 'pending' && (
                            <>
                              <CButton 
                                color="success" 
                                size="sm" 
                                className="me-2"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CIcon icon={cilCheckCircle} /> Approve
                              </CButton>
                              <CButton 
                                color="danger" 
                                size="sm"
                                onClick={() => handleReject(request.id)}
                              >
                                <CIcon icon={cilX} /> Reject
                              </CButton>
                            </>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* View Details Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Franchise Request Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedRequest && (
            <CRow>
              <CCol md={6}>
                <h5>Personal Information</h5>
                <p><strong>Name:</strong> {selectedRequest.user_name}</p>
                <p><strong>Email:</strong> {selectedRequest.user_email}</p>
                <p><strong>Phone:</strong> {selectedRequest.user_phone}</p>
                
                <h5 className="mt-4">Location Details</h5>
                <p><strong>City:</strong> {selectedRequest.requested_city}</p>
                <p><strong>State:</strong> {selectedRequest.requested_state || '-'}</p>
                <p><strong>Country:</strong> {selectedRequest.requested_country}</p>
              </CCol>
              <CCol md={6}>
                <h5>Business Information</h5>
                <p><strong>Investment Budget:</strong> ${selectedRequest.investment_budget.toLocaleString()}</p>
                <p><strong>Experience:</strong> {selectedRequest.experience_in_food_business || 'Not specified'}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedRequest.request_status)}</p>
                <p><strong>Submitted:</strong> {format(new Date(selectedRequest.created_at), 'MMM dd, yyyy HH:mm')}</p>
                
                <h5 className="mt-4">Additional Details</h5>
                <div className="bg-light p-3 rounded">
                  {selectedRequest.additional_details || 'No additional details provided'}
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          {selectedRequest?.request_status === 'pending' && (
            <>
              <CButton color="success" onClick={() => {
                handleApprove(selectedRequest.id);
                setVisible(false);
              }}>
                Approve
              </CButton>
              <CButton color="danger" onClick={() => {
                handleReject(selectedRequest.id);
                setVisible(false);
              }}>
                Reject
              </CButton>
            </>
          )}
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AdminDashboard;