import React, { useState, useEffect, useCallback } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CCard,
  CCardBody,
  CCardHeader,
  CBadge,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CForm,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilSearch,
  cilInfo,
  cilTrash,
  cilCheckCircle,
  cilPencil,
  cilUser,
  cilPhone,
  cilEnvelopeOpen,
  cilCalendar,
  cilClock,
  cilLocationPin,
  cilFile,
  cilWarning,
  cilList
} from '@coreui/icons';
import axios from "axios";
import { format } from 'date-fns';
import { BASE_URL } from '../../config'; 
const JobApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [toast, setToast] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Interview Scheduled', label: 'Interview Scheduled' },
    { value: 'Interviewed', label: 'Interviewed' },
    { value: 'Selected', label: 'Selected' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Withdrawn', label: 'Withdrawn' }
  ];

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/job-applications/`);
      const formattedData = response.data.map(app => ({
        ...app,
        status: formatStatus(app.status),
        formattedDate: format(new Date(app.created_at), 'MMM dd, yyyy'),
        resume_url: app.resume_url ? app.resume_url.replace('${BASE_URL}', '') : null
      }));
      setApplications(formattedData);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch applications: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error fetching applications:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const formatStatus = (status) => {
    if (!status) return 'Pending';
    
    const statusMap = {
      'pending': 'Pending',
      'under review': 'Under Review',
      'interview scheduled': 'Interview Scheduled',
      'interviewed': 'Interviewed',
      'selected': 'Selected',
      'rejected': 'Rejected',
      'on hold': 'On Hold',
      'withdrawn': 'Withdrawn'
    };
    
    return statusMap[status.toLowerCase()] || status;
  };

  const filterApplications = () => {
    let filtered = [...applications];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term) ||
        app.job_position_title.toLowerCase().includes(term) ||
        app.phone.includes(term)
      );
    }
    
    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${BASE_URL}/job-applications/${id}/status`,
        { status }
      );
      
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Status updated to {status} successfully
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchApplications();
      setIsStatusModalOpen(false);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to update status: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error updating application status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/job-applications/${id}`);
      
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Application deleted successfully
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchApplications();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to delete application: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error deleting application:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Under Review': return 'info';
      case 'Interview Scheduled': return 'primary';
      case 'Interviewed': return 'secondary';
      case 'Selected': return 'success';
      case 'Rejected': return 'danger';
      case 'On Hold': return 'dark';
      case 'Withdrawn': return 'light';
      default: return 'secondary';
    }
  };

  return (
    <div className="job-applications-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilUser} className="me-2 text-primary" />
                Job Applications Management
              </h4>
              <small className="text-muted">Manage job applications and candidate status</small>
            </CCol>
            {/* <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={fetchApplications}
                disabled={isLoading}
                shape="rounded-pill"
              >
                {isLoading ? <CSpinner size="sm" /> : "Refresh"}
              </CButton>
            </CCol> */}
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
                  placeholder="Search by name, email, position or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-end"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
              <CInputGroup>
                {/* <CInputGroupText>
                  <CIcon icon={cilList} />
                </CInputGroupText> */}
                <CFormSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>

          {isLoading && !applications.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No applications found</h5>
              <p className="text-muted">
                {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'No applications have been submitted yet'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell>Candidate</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Applied</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredApplications.map((app) => (
                    <CTableRow key={app.id} className="align-middle">
                      <CTableDataCell>
                        <strong>{app.full_name}</strong>
                        <div className="small text-muted">
                          <CIcon icon={cilEnvelopeOpen} className="me-1" />
                          {app.email}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilPhone} className="me-1" />
                        {app.phone}
                      </CTableDataCell>
                      <CTableDataCell>
                        {app.job_position_title}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadgeColor(app.status)}>
                          {app.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilCalendar} className="me-1" />
                        {app.formattedDate}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="outline-info"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsViewModalOpen(true);
                          }}
                          className="me-2"
                          title="View Details"
                        >
                          <CIcon icon={cilInfo} />
                        </CButton>
                        <CButton
                          color="outline-warning"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(app);
                            setSelectedStatus(app.status);
                            setIsStatusModalOpen(true);
                          }}
                          className="me-2"
                          title="Change Status"
                        >
                          <CIcon icon={cilList} />
                        </CButton>
                        <CButton
                          color="outline-danger"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this application?')) {
                              handleDeleteApplication(app.id);
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

      {/* View Application Modal */}
      <CModal 
        visible={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CIcon icon={cilInfo} className="me-2 text-info" />
            Application Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedApplication && (
            <CRow>
              <CCol md={6}>
                <h5>
                  <CIcon icon={cilUser} className="me-2 text-primary" />
                  Candidate Information
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilUser} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Full Name</small>
                        <div>{selectedApplication.full_name}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilEnvelopeOpen} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Email</small>
                        <div>{selectedApplication.email}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilPhone} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Phone</small>
                        <div>{selectedApplication.phone}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilLocationPin} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Address</small>
                        <div>{selectedApplication.address || 'Not provided'}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6}>
                <h5>
                  <CIcon icon={cilList} className="me-2 text-primary" />
                  Application Details
                </h5>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilList} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Position</small>
                        <div>{selectedApplication.job_position_title}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Status</small>
                        <div>
                          <CBadge color={getBadgeColor(selectedApplication.status)}>
                            {selectedApplication.status}
                          </CBadge>
                        </div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCalendar} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Applied On</small>
                        <div>{selectedApplication.formattedDate}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  {selectedApplication.resume_url && (
                    <CListGroupItem>
                      <div className="d-flex align-items-center">
                        <CIcon icon={cilFile} className="me-3 text-primary" />
                        <div>
                          <small className="text-muted">Resume</small>
                          <div>
                            <CButton 
                              color="primary" 
                              href={`${BASE_URL}${selectedApplication.resume_url}`} 
                              target="_blank"
                              size="sm"
                            >
                              View Resume
                            </CButton>
                          </div>
                        </div>
                      </div>
                    </CListGroupItem>
                  )}
                </CListGroup>
              </CCol>
              <CCol xs={12} className="mt-4">
                <h5>
                  <CIcon icon={cilInfo} className="me-2 text-primary" />
                  Cover Letter
                </h5>
                <div className="bg-light p-3 rounded">
                  {selectedApplication.cover_letter || 'No cover letter provided'}
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton 
            color="secondary" 
            onClick={() => setIsViewModalOpen(false)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Status Update Modal */}
      <CModal 
        visible={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CIcon icon={cilList} className="me-2 text-warning" />
            Update Application Status
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={(e) => {
          e.preventDefault();
          updateApplicationStatus(selectedApplication.id, selectedStatus);
        }}>
          <CModalBody>
            {selectedApplication && (
              <>
                <div className="mb-3">
                  <p className="mb-1"><strong>Candidate:</strong> {selectedApplication.full_name}</p>
                  <p className="mb-3"><strong>Position:</strong> {selectedApplication.job_position_title}</p>
                  
                  <CFormSelect
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    required
                  >
                    <option value="">Select new status...</option>
                    {statusOptions.filter(opt => opt.value !== 'all').map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton 
              color="secondary" 
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </CButton>
            <CButton 
              color="primary" 
              type="submit"
              disabled={!selectedStatus || selectedStatus === selectedApplication?.status || isLoading}
            >
              {isLoading ? <CSpinner size="sm" /> : 'Update Status'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default JobApplicationsManagement;