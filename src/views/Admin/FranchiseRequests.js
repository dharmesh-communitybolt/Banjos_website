import React, { useState, useEffect, useCallback } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CCard,
  CCardBody,
  CCardHeader,
  CAlert,
  CBadge,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CNav,
  CRow,
  CCol,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilSearch,
  cilFilter,
  cilInfo,
  cilTrash,
  cilCheckCircle,
  cilXCircle,
  cilPencil,
  cilPlus,
  cilUser,
  cilPhone,
  cilEnvelopeOpen,
  cilCalendar,
  cilClock,
  cilLocationPin,
  cilMap,
  cilWarning
} from '@coreui/icons';
import axios from "axios";
import { format } from 'date-fns';
import { BASE_URL } from '../../config'; 
const FranchiseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState(null);


  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/franchise/requests/`);
      setRequests(response.data);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch franchise requests: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error fetching franchise requests:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter]);

  const filterRequests = () => {
    let result = [...requests];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(request => 
        request.user_name.toLowerCase().includes(term) ||
        request.user_email.toLowerCase().includes(term) ||
        request.requested_city.toLowerCase().includes(term) ||
        request.requested_country.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(request => request.request_status === statusFilter);
    }
    
    setFilteredRequests(result);
  };

  const updateRequestStatus = async (id, status) => {
    try {
      setLoading(true);
      
      await axios.put(
        `${BASE_URL}/franchise/requests/${id}/status/${status}`
      );
      
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Request status updated to {status} successfully
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchRequests();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to update request status: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error updating request status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/franchise/requests/${id}`);
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Request deleted successfully
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      fetchRequests();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to delete request: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error deleting request:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "warning", text: "Pending" },
      approved: { color: "success", text: "Approved" },
      rejected: { color: "danger", text: "Rejected" }
    };
    return statusMap[status] || { color: "secondary", text: status };
  };

  return (
    <div className="franchise-requests-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilLocationPin} className="me-2 text-primary" />
                Franchise Requests Management
              </h4>
              <small className="text-muted">Manage franchise requests from potential partners</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              {/* <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={fetchRequests}
                disabled={loading}
                shape="rounded-pill"
              >
                {loading ? <CSpinner size="sm" /> : "Refresh"}
              </CButton> */}
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            <CCol xs={12} lg={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Search by name, email, city or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-end"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
  <CFormSelect
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    aria-label="Filter by status"
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </CFormSelect>
</CCol>
          </CRow>

          {loading && !requests.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading franchise requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No franchise requests found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try a different search term' : 'No requests have been submitted yet'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                    <CTableHeaderCell>Budget</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Submitted</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredRequests.map((request) => (
                    <CTableRow key={request.id} className="align-middle">
                      <CTableDataCell>
                        <strong>{request.user_name}</strong>
                        <div className="small text-muted">
                          <CIcon icon={cilEnvelopeOpen} className="me-1" />
                          {request.user_email}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilPhone} className="me-1" />
                        {request.user_phone}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilMap} className="me-1" />
                        {request.requested_city}, {request.requested_country}
                      </CTableDataCell>
                      <CTableDataCell>
                        ${request.investment_budget.toLocaleString()}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getStatusBadge(request.request_status).color}>
                          {getStatusBadge(request.request_status).text}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilCalendar} className="me-1" />
                        {format(new Date(request.created_at), 'MMM dd, yyyy')}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="outline-info"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowModal(true);
                          }}
                          className="me-2"
                          title="View Details"
                        >
                          <CIcon icon={cilInfo} />
                        </CButton>
                        {request.request_status === "pending" && (
                          <>
                            <CButton
                              color="outline-success"
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, "approved")}
                              className="me-2"
                              title="Approve"
                            >
                              <CIcon icon={cilCheckCircle} />
                            </CButton>
                            <CButton
                              color="outline-danger"
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, "rejected")}
                              className="me-2"
                              title="Reject"
                            >
                              <CIcon icon={cilXCircle} />
                            </CButton>
                          </>
                        )}
                        <CButton
                          color="outline-danger"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this request?')) {
                              handleDeleteRequest(request.id);
                            }
                          }}
                          title="Delete"
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          )}
        </CCardBody>
      </CCard>

      {/* Request Details Modal */}
      <CModal 
        visible={showModal} 
        onClose={() => setShowModal(false)} 
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CIcon icon={cilInfo} className="me-2 text-info" />
            Franchise Request Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedRequest && (
            <CRow>
              <CCol md={6}>
                <h5>
                  <CIcon icon={cilUser} className="me-2 text-primary" />
                  Personal Information
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilUser} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Name</small>
                        <div>{selectedRequest.user_name}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilEnvelopeOpen} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Email</small>
                        <div>{selectedRequest.user_email}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilPhone} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Phone</small>
                        <div>{selectedRequest.user_phone}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>

                <h5 className="mt-4">
                  <CIcon icon={cilCalendar} className="me-2 text-primary" />
                  Timeline
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilClock} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Submitted</small>
                        <div>{format(new Date(selectedRequest.created_at), 'MMM dd, yyyy HH:mm')}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Status</small>
                        <div>
                          <CBadge color={getStatusBadge(selectedRequest.request_status).color}>
                            {getStatusBadge(selectedRequest.request_status).text}
                          </CBadge>
                        </div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6}>
                <h5>
                  <CIcon icon={cilLocationPin} className="me-2 text-primary" />
                  Location Details
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilMap} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">City</small>
                        <div>{selectedRequest.requested_city}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilMap} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">State</small>
                        <div>{selectedRequest.requested_state || "Not specified"}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilMap} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Country</small>
                        <div>{selectedRequest.requested_country}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>

                <h5 className="mt-4">
                  <CIcon icon={cilCheckCircle} className="me-2 text-primary" />
                  Business Details
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Investment Budget</small>
                        <div>${selectedRequest.investment_budget.toLocaleString()}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Food Business Experience</small>
                        <div>{selectedRequest.experience_in_food_business || "None"}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={12} className="mt-4">
                <h5>
                  <CIcon icon={cilInfo} className="me-2 text-primary" />
                  Additional Details
                </h5>
                <div className="bg-light p-3 rounded">
                  {selectedRequest.additional_details || "No additional details provided"}
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton 
            color="secondary" 
            onClick={() => setShowModal(false)}
          >
            Close
          </CButton>
          {selectedRequest?.request_status === "pending" && (
            <div className="d-flex gap-2">
              <CButton 
                color="success" 
                onClick={() => {
                  updateRequestStatus(selectedRequest.id, "approved");
                  setShowModal(false);
                }}
              >
                <CIcon icon={cilCheckCircle} className="me-2" />
                Approve
              </CButton>
              <CButton 
                color="danger" 
                onClick={() => {
                  updateRequestStatus(selectedRequest.id, "rejected");
                  setShowModal(false);
                }}
              >
                <CIcon icon={cilXCircle} className="me-2" />
                Reject
              </CButton>
            </div>
          )}
        </CModalFooter>
      </CModal>

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default FranchiseRequests;