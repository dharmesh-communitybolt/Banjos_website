import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  CCard,
  CCardHeader,
  CCardBody,
  CAlert,
  CSpinner,
  CImage,
  CInputGroup,
  CInputGroupText,
  CBadge,
  CPagination,
  CPaginationItem,
  CTooltip,
  CFormLabel,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CRow,
  CCol
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilPencil,
  cilTrash,
  cilPlus,
  cilSearch,
  cilCloudUpload,
  cilFilter,
  cilInfo,
  cilCheckCircle,
  cilXCircle,
  cilX,
  cilWarning
} from '@coreui/icons';
import { BASE_URL } from '../../config'; 

const OnlineOrderLinks = () => {
  const [links, setLinks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    logo: null,
    branch_id: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    platform: '',
    url: '',
    branch_id: '',
    logo: ''
  });


  useEffect(() => {
    fetchLinks();
    fetchBranches();
  }, []);

  useEffect(() => {
    filterLinks();
  }, [links, searchTerm, branchFilter]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/online-order-links/`);
      setLinks(response.data);
    } catch (err) {
      console.error('Failed to fetch links:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch links. Please try again later.
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/branches`);
      setBranches(response.data);
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to load branch data
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    }
  };

  const filterLinks = () => {
    let result = [...links];
    
    // Apply search filter
    if (searchTerm) {
      const branch = branches.find(b => b.id === link.branch_id);
      return (
        link.platform.toLowerCase().includes(term) ||
         link.url.toLowerCase().includes(term) ||
    (branch && branch.name.toLowerCase().includes(term))
);

    }
    
    // Apply branch filter
    if (branchFilter !== 'all') {
      result = result.filter(link => link.branch_id === parseInt(branchFilter));
    }
    
    setFilteredLinks(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetForm = () => {
    setFormData({
      platform: '',
      url: '',
      logo: null,
      branch_id: '',
    });
    setSelectedLink(null);
    setLogoPreview(null);
    setValidationErrors({
      platform: '',
      url: '',
      branch_id: '',
      logo: ''
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.platform.trim()) {
      errors.platform = 'Platform name is required';
      isValid = false;
    }

    if (!formData.url.trim()) {
      errors.url = 'URL is required';
      isValid = false;
    } else if (!/^https?:\/\//i.test(formData.url)) {
      errors.url = 'URL must start with http:// or https://';
      isValid = false;
    }

    if (!formData.branch_id) {
      errors.branch_id = 'Branch selection is required';
      isValid = false;
    }

    if (!selectedLink && !formData.logo) {
      errors.logo = 'Logo is required for new links';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setValidationErrors({ ...validationErrors, logo: 'Please upload an image file' });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setValidationErrors({ ...validationErrors, logo: 'File size must be less than 2MB' });
        return;
      }

      setFormData({ ...formData, logo: file });
      setValidationErrors({ ...validationErrors, logo: '' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (link) => {
    setSelectedLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      logo: null,
      branch_id: link.branch_id,
    });
    setLogoPreview(link.logo ? `${BASE_URL}${link.logo}` : null);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/online-order-links/${id}`);
      fetchLinks();
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Link deleted successfully.
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete link:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to delete link. Please try again.
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const form = new FormData();
      form.append('platform', formData.platform);
      form.append('url', formData.url);
      form.append('branch_id', formData.branch_id);
      
      if (formData.logo) {
        form.append('logo', formData.logo);
      }

      if (selectedLink) {
        await axios.put(
          `${BASE_URL}/api/online-order-links/${selectedLink.id}`,
          form,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Link updated successfully.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      } else {
        await axios.post(
          `${BASE_URL}/api/online-order-links/`,
          form,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Link created successfully.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      }

      fetchLinks();
      setModalVisible(false);
      resetForm();
    } catch (err) {
      console.error('Failed to save link:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || 'Failed to save link. Please try again.'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="online-order-links-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilInfo} className="me-2 text-primary" />
                Online Order Links Management
              </h4>
              <small className="text-muted">Manage your online ordering platform links</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              {/* <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={fetchLinks} 
                disabled={loading}
                className="me-2"
              >
                {loading ? <CSpinner size="sm" /> : "Refresh"}
              </CButton> */}
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={openAddModal}
                className="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Link
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
                  placeholder="Search by platform, URL or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
              <CInputGroup>
                {/* <CInputGroupText>
                  <CIcon icon={cilFilter} />
                </CInputGroupText> */}
                <CFormSelect
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                >
                  <option value="all">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>

          {loading && !links.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading order links...</p>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No order links found</h5>
              <p className="text-muted">
                {searchTerm || branchFilter !== 'all' ? 'Try adjusting your search or filters' : 'Add your first order link to get started'}
              </p>
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={openAddModal}
                className="mt-2"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Link
              </CButton>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <small className="text-medium-emphasis">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLinks.length)} of {filteredLinks.length} links
                  {(searchTerm || branchFilter !== 'all') && ' (filtered)'}
                </small>
              </div>

              <div className="table-responsive">
                <CTable striped hover responsive>
                  <CTableHead className="bg-light">
                    <CTableRow>
                      <CTableHeaderCell>Logo</CTableHeaderCell>
                      <CTableHeaderCell>Platform</CTableHeaderCell>
                      <CTableHeaderCell>URL</CTableHeaderCell>
                      <CTableHeaderCell>Branch</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentItems.map((link) => (
                      <CTableRow key={link.id}>
                        <CTableDataCell>
                          {link.logo ? (
                            <CImage
                              thumbnail
                              src={`${BASE_URL}${link.logo}`}
                              alt={link.platform}
                              width={50}
                              height={50}
                              style={{ objectFit: 'contain' }}
                            />
                          ) : (
                            <CBadge color="secondary">No Logo</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{link.platform}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.url.length > 40 ? `${link.url.substring(0, 40)}...` : link.url}
                          </a>
                        </CTableDataCell>
                        <CTableDataCell>
                          {branches.find((branch) => branch.id === link.branch_id)?.name || "N/A"}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="outline-info"
                            size="sm"
                            onClick={() => openEditModal(link)}
                            className="me-2"
                            title="View Details"
                          >
                            <CIcon icon={cilInfo} />
                          </CButton>
                          <CButton
                            color="outline-warning"
                            size="sm"
                            onClick={() => openEditModal(link)}
                            className="me-2"
                            title="Edit"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="outline-danger"
                            size="sm"
                            onClick={() => setDeleteConfirm(link.id)}
                            title="Delete"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>

                          {deleteConfirm === link.id && (
                            <div className="mt-2 p-2 bg-light rounded">
                              <p className="mb-2 small">Are you sure you want to delete this link?</p>
                              <div className="d-flex gap-2">
                                <CButton
                                  size="sm"
                                  color="danger"
                                  onClick={() => handleDelete(link.id)}
                                >
                                  Yes, delete
                                </CButton>
                                <CButton
                                  size="sm"
                                  color="secondary"
                                  onClick={() => setDeleteConfirm(null)}
                                >
                                  Cancel
                                </CButton>
                              </div>
                            </div>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination>
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </CPaginationItem>
                    {[...Array(totalPages).keys()].map((number) => (
                      <CPaginationItem
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </CPaginationItem>
                    ))}
                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}
            </>
          )}
        </CCardBody>
      </CCard>

      {/* Add/Edit Modal */}
      <CModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); resetForm(); }}
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>{selectedLink ? "Edit" : "Add"} Online Order Link</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Platform Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    name="platform"
                    placeholder="e.g. Uber Eats, DoorDash"
                    value={formData.platform}
                    onChange={handleInputChange}
                    invalid={!!validationErrors.platform}
                  />
                  {validationErrors.platform && (
                    <div className="invalid-feedback">{validationErrors.platform}</div>
                  )}
                </div>

                <div className="mb-3">
                  <CFormLabel>Order URL *</CFormLabel>
                  <CFormInput
                    type="url"
                    name="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={handleInputChange}
                    invalid={!!validationErrors.url}
                  />
                  {validationErrors.url && (
                    <div className="invalid-feedback">{validationErrors.url}</div>
                  )}
                </div>

                <div className="mb-3">
                  <CFormLabel>Branch *</CFormLabel>
                  <CFormSelect
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleInputChange}
                    invalid={!!validationErrors.branch_id}
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </CFormSelect>
                  {validationErrors.branch_id && (
                    <div className="invalid-feedback">{validationErrors.branch_id}</div>
                  )}
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>
                    {selectedLink ? 'Update Logo' : 'Upload Logo *'}
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    invalid={!!validationErrors.logo}
                  />
                  {validationErrors.logo && (
                    <div className="invalid-feedback">{validationErrors.logo}</div>
                  )}
                  
                  {(logoPreview || (selectedLink?.logo && !formData.logo)) && (
                    <div className="mt-3">
                      <p className="small text-muted">Logo Preview:</p>
                      <CImage
                        thumbnail
                        src={logoPreview || `${BASE_URL}${selectedLink.logo}`}
                        width={100}
                        height={100}
                        className="border p-1"
                      />
                    </div>
                  )}
                  
                  {formData.logo && formData.logo instanceof File && (
                    <div className="mt-2 small text-muted">
                      <CIcon icon={cilCloudUpload} /> Selected: {formData.logo.name}
                    </div>
                  )}
                </div>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => { setModalVisible(false); resetForm(); }}
            disabled={loading}
          >
            <CIcon icon={cilX} className="me-2" />
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <CSpinner component="span" size="sm" aria-hidden="true" />
                {selectedLink ? ' Updating...' : ' Creating...'}
              </>
            ) : selectedLink ? (
              'Save Changes'
            ) : (
              'Add Link'
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default OnlineOrderLinks;