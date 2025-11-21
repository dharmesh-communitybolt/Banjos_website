import React, { useState, useEffect, useCallback } from 'react';
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
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CAlert,
  CSpinner,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
  CImage,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilPlus,
  cilTrash,
  cilCheckCircle,
  cilWarning,
  cilInfo,
  cilSearch,
  cilUser,
  cilEnvelopeOpen,
  cilStar,
  cilImage,
  cilOptions
} from '@coreui/icons';
import axios from 'axios';
import { format } from 'date-fns';
import { BASE_URL } from '../../config'; 

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const initialFormState = {
    name: "",
    email: "",
    description: "",
    rating: 5,
    image: null,
    status: "pending"
  };

  const [formData, setFormData] = useState(initialFormState);

  const statusOptions = [
    { value: "pending", label: "Pending", color: "warning" },
    { value: "approved", label: "Approved", color: "success" },
    { value: "rejected", label: "Rejected", color: "danger" }
  ];

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/testimonial/`);
      setTestimonials(response.data);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch testimonials: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error fetching testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, statusFilter]);

  const filterTestimonials = () => {
    let filtered = [...testimonials];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(testimonial => testimonial.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(testimonial => 
        testimonial.name.toLowerCase().includes(term) ||
        testimonial.email.toLowerCase().includes(term) ||
        testimonial.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredTestimonials(filtered);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Please upload an image file
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Image size should be less than 2MB
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      return;
    }

    setFormData({ ...formData, image: file });
    
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('rating', formData.rating.toString());
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.post(`${BASE_URL}/testimonial/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Testimonial added successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchTestimonials();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || 'Failed to add testimonial'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error adding testimonial:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${BASE_URL}/testimonial/${id}/status?status=${status}`
      );
      
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Status updated successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchTestimonials();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to update status
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error updating status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/testimonial/${id}`);
      
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Testimonial deleted successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchTestimonials();
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to delete testimonial
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error deleting testimonial:", err);
    } finally {
      setIsLoading(false);
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <CIcon 
        key={i} 
        icon={cilStar} 
        className={i < rating ? "text-warning" : "text-secondary"} 
      />
    ));
  };

  return (
    <div className="testimonials-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilCheckCircle} className="me-2 text-primary" />
                Testimonials Management
              </h4>
              <small className="text-muted">Manage customer testimonials and reviews</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={() => setIsModalOpen(true)}
                shape="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add Testimonial
              </CButton>
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
        placeholder="Search by name, email or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-end"
      />
    </CInputGroup>
  </CCol>
  <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
    <CFormSelect
      aria-label="Filter by status"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </CFormSelect>
  </CCol>
</CRow>
       

          {isLoading && !testimonials.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading testimonials...</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No testimonials found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try a different search term' : 'Add your first testimonial to get started'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell>Customer</CTableHeaderCell>
                    <CTableHeaderCell>Testimonial</CTableHeaderCell>
                    <CTableHeaderCell>Rating</CTableHeaderCell>
                    <CTableHeaderCell>Photo</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredTestimonials.map((testimonial) => (
                    <CTableRow key={testimonial.id} className="align-middle">
                      <CTableDataCell>
                        <strong>{testimonial.name}</strong>
                        <div className="small text-muted">
                          <CIcon icon={cilEnvelopeOpen} className="me-1" />
                          {testimonial.email}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-truncate" style={{ maxWidth: '200px' }}>
                        {testimonial.description}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {testimonial.image ? (
                          <CImage
                            src={`${BASE_URL}${testimonial.image}`}
                            alt={testimonial.name}
                            thumbnail
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        ) : (
                          <CIcon icon={cilImage} size="xl" className="text-muted" />
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getStatusBadge(testimonial.status).color}>
                          {getStatusBadge(testimonial.status).text}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="outline-info"
                          size="sm"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsViewModalOpen(true);
                          }}
                          className="me-2"
                          title="View Details"
                        >
                          <CIcon icon={cilInfo} />
                        </CButton>
                        <CButton
                          color="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
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

      {/* Add Testimonial Modal */}
      <CModal 
        visible={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }} 
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add New Testimonial</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddTestimonial}>
            <CRow>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormInput
                    type="text"
                    name="name"
                    label="Customer Name *"
                    placeholder="Enter customer name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormInput
                    type="email"
                    name="email"
                    label="Email *"
                    placeholder="Enter customer email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormSelect
                    name="rating"
                    label="Rating *"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </CFormSelect>
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormTextarea
                    name="description"
                    label="Testimonial *"
                    placeholder="Enter testimonial content"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormInput
                    type="file"
                    label="Customer Photo"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <CImage
                        src={imagePreview}
                        alt="Preview"
                        thumbnail
                        style={{ maxWidth: '150px' }}
                      />
                    </div>
                  )}
                </div>
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton 
                color="secondary" 
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                variant="outline"
              >
                Cancel
              </CButton>
              <CButton 
                color="primary" 
                type="submit"
                disabled={isLoading}
                className="px-4"
              >
                {isLoading ? <CSpinner size="sm" /> : 'Add Testimonial'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* View Testimonial Modal */}
      <CModal 
        visible={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Testimonial Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedTestimonial && (
            <CRow>
              <CCol md={4}>
                <div className="text-center mb-4">
                  {selectedTestimonial.image ? (
                    <CImage
                      src={`${BASE_URL}${selectedTestimonial.image}`}
                      alt={selectedTestimonial.name}
                      fluid
                      thumbnail
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  ) : (
                    <div className="text-muted p-5 border rounded">
                      <CIcon icon={cilUser} size="xxl" />
                      <p>No photo available</p>
                    </div>
                  )}
                </div>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilUser} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Name</small>
                        <div>{selectedTestimonial.name}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilEnvelopeOpen} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Email</small>
                        <div>{selectedTestimonial.email}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilStar} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Rating</small>
                        <div className="d-flex">
                          {renderStars(selectedTestimonial.rating)}
                        </div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Status</small>
                        <div>
                          <CBadge color={getStatusBadge(selectedTestimonial.status).color}>
                            {getStatusBadge(selectedTestimonial.status).text}
                          </CBadge>
                        </div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={8}>
                <h5>Testimonial Content</h5>
                <div className="bg-light p-3 rounded mb-4">
                  {selectedTestimonial.description}
                </div>
                
                <div className="d-flex gap-2">
                  {statusOptions.map((status) => (
                    <CButton
                      key={status.value}
                      color={status.value === selectedTestimonial.status ? status.color : `outline-${status.color}`}
                      onClick={() => handleUpdateStatus(selectedTestimonial.id, status.value)}
                      disabled={status.value === selectedTestimonial.status || isLoading}
                    >
                      {status.label}
                    </CButton>
                  ))}
                </div>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsViewModalOpen(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default TestimonialsManagement;