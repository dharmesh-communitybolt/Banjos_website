import React, { useState, useEffect, useCallback } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CFormCheck,
  CCard,
  CFormLabel,
  CCardBody,
  CCardHeader,
  CSpinner,
  CAlert,
  CBadge,
  CImage,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilPencil,
  cilTrash,
  cilPlus,
  cilInfo,
  cilSearch,
  cilMap,
  cilPhone,
  cilEnvelopeOpen,
  cilCalendar,
  cilUser,
  cilClock,
  cilCheckCircle,
  cilLocationPin,
  cilBuilding,
  cilWarning,
} from "@coreui/icons";
import { BASE_URL } from '../../config'; 

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [toast, setToast] = useState(null);
 

  const initialFormState = {
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone_number: "",
    email: "",
    opening_hours: "",
    manager_name: "",
    branch_opening_date: "",
    branch_status: "open",
    seating_capacity: "",
    parking_availability: false,
    wifi_availability: false,
    image: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchBranches = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/branches/`);
      if (!response.ok) {
        throw new Error("Failed to fetch branches");
      }
      const data = await response.json();
      setBranches(Array.isArray(data) ? data : []);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch branches: {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error fetching branches:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Branch name is required";
    if (!formData.latitude) errors.latitude = "Latitude is required";
    if (!formData.longitude) errors.longitude = "Longitude is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openModal = (branch = null) => {
    if (branch) {
      setCurrentBranch(branch);
      setFormData({
        ...branch,
        image: null,
      });
    } else {
      setCurrentBranch(null);
      setFormData(initialFormState);
    }
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openViewModal = (branch) => {
    setCurrentBranch(branch);
    setIsViewModalOpen(true);
  };

  const confirmDelete = (branch) => {
    setCurrentBranch(branch);
    setIsDeleteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const url = currentBranch
      ? `${BASE_URL}/branches/${currentBranch.id}`
      : `${BASE_URL}/branches/`;
    const method = currentBranch ? "PUT" : "POST";

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(
          currentBranch ? "Failed to update branch" : "Failed to create branch"
        );
      }

      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilInfo} className="me-2" />
          {currentBranch ? "Branch updated successfully!" : "Branch created successfully!"}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchBranches();
      setIsModalOpen(false);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error saving branch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/branches/${currentBranch.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete branch");
      }

      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilInfo} className="me-2" />
          Branch deleted successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      
      fetchBranches();
      setIsDeleteModalOpen(false);
    } catch (err) {
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      console.error("Error deleting branch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const [statusFilter, setStatusFilter] = useState('all');
  const filteredBranches = branches.filter((branch) => {
    const matchesSearch = Object.values(branch).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && branch.branch_status === statusFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return <CBadge color="success">Open</CBadge>;
      case "closed":
        return <CBadge color="danger">Closed</CBadge>;
      case "under_maintenance":
        return <CBadge color="warning">Under Maintenance</CBadge>;
      default:
        return <CBadge color="secondary">{status}</CBadge>;
    }
  };

  return (
    <div className="branches-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilLocationPin} className="me-2 text-primary" />
                Branches Management
              </h4>
              <small className="text-muted">Manage your restaurant branches</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={() => openModal()}
                shape="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Branch
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
                  placeholder="Search branches..."
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
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="under_maintenance">Under Maintenance</option>
              </CFormSelect>
            </CCol>
          </CRow>

          {isLoading && !branches.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading branches...</p>
            </div>
          ) : filteredBranches.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No branches found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try a different search term' : 'Add your first branch to get started'}
              </p>
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={() => openModal()}
                className="mt-2"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Branch
              </CButton>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell>Branch</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredBranches.map((branch) => (
                    <CTableRow key={branch.id} className="align-middle">
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          {branch.image_url ? (
                            <CImage
                              src={`${BASE_URL}${branch.image_url}`}
                              alt={branch.name}
                              thumbnail
                              className="me-3"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          ) : (
                            <CIcon icon={cilBuilding} size="xl" className="me-3 text-muted" />
                          )}
                          <div>
                            <strong>{branch.name}</strong>
                            {branch.manager_name && (
                              <div className="small text-muted">
                                <CIcon icon={cilUser} className="me-1" />
                                {branch.manager_name}
                              </div>
                            )}
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <CIcon icon={cilMap} className="me-2 text-primary" />
                          {branch.city}, {branch.country}
                        </div>
                        <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>
                          {branch.address}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {branch.phone_number && (
                          <div className="d-flex align-items-center mb-1">
                            <CIcon icon={cilPhone} className="me-2 text-info" />
                            <a href={`tel:${branch.phone_number}`}>{branch.phone_number}</a>
                          </div>
                        )}
                        {branch.email && (
                          <div className="d-flex align-items-center">
                            <CIcon icon={cilEnvelopeOpen} className="me-2 text-info" />
                            <a href={`mailto:${branch.email}`}>{branch.email}</a>
                          </div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {getStatusBadge(branch.branch_status)}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="outline-info"
                          size="sm"
                          onClick={() => openViewModal(branch)}
                          className="me-2"
                          title="View Details"
                        >
                          <CIcon icon={cilInfo} />
                        </CButton>
                        <CButton
                          color="outline-warning"
                          size="sm"
                          onClick={() => openModal(branch)}
                          className="me-2"
                          title="Edit"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="outline-danger"
                          size="sm"
                          onClick={() => confirmDelete(branch)}
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
{/* Add/Edit Branch Modal */}
<CModal
  visible={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  size="xl"
  backdrop="static"
>
  <CModalHeader closeButton>
    <CModalTitle>{currentBranch ? "Edit Branch" : "Add New Branch"}</CModalTitle>
  </CModalHeader>

  <CModalBody>
    <CForm onSubmit={handleSubmit}>
      <CRow className="g-4">
        {/* Left Column */}
        <CCol md={6}>
          <CFormLabel htmlFor="name">Branch Name *</CFormLabel>
          <CFormInput
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter branch name"
            invalid={!!formErrors.name}
            feedback={formErrors.name}
            required
          />

          <CFormLabel className="mt-3" htmlFor="address">Address *</CFormLabel>
          <CFormTextarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter full address"
            invalid={!!formErrors.address}
            feedback={formErrors.address}
            required
          />

          <CRow className="g-3 mt-1">
            <CCol md={6}>
              <CFormLabel htmlFor="latitude">Latitude *</CFormLabel>
              <CFormInput
                type="number"
                name="latitude"
                step="0.000001"
                min="-90"
                max="90"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="Enter latitude"
                invalid={!!formErrors.latitude}
                feedback={formErrors.latitude}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="longitude">Longitude *</CFormLabel>
              <CFormInput
                type="number"
                name="longitude"
                step="0.000001"
                min="-180"
                max="180"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="Enter longitude"
                invalid={!!formErrors.longitude}
                feedback={formErrors.longitude}
                required
              />
            </CCol>
          </CRow>

          <CRow className="g-3 mt-1">
            <CCol md={6}>
              <CFormLabel htmlFor="city">City *</CFormLabel>
              <CFormInput
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                invalid={!!formErrors.city}
                feedback={formErrors.city}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="country">Country *</CFormLabel>
              <CFormInput
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                invalid={!!formErrors.country}
                feedback={formErrors.country}
                required
              />
            </CCol>
          </CRow>

          <CRow className="g-3 mt-1">
            <CCol md={6}>
              <CFormLabel htmlFor="state">State/Province</CFormLabel>
              <CFormInput
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state or province"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="zipcode">Postal/Zip Code</CFormLabel>
              <CFormInput
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                placeholder="Enter postal/zip code"
              />
            </CCol>
            <CFormLabel className="mt-3" htmlFor="image">Branch Image</CFormLabel>
          <CFormInput
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
          />
          {currentBranch?.image_url && (
            <div className="mt-2">
              <CImage
                src={`${BASE_URL}${currentBranch.image_url}`}
                alt="Current branch"
                thumbnail
                style={{ maxWidth: '150px' }}
              />
              <small className="text-muted">Current image</small>
            </div>
          )}
          </CRow>
        </CCol>

        {/* Right Column */}
        <CCol md={6}>
          <CFormLabel htmlFor="phone_number">Phone Number</CFormLabel>
          <CFormInput
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />

          <CFormLabel className="mt-3" htmlFor="email">Email</CFormLabel>
          <CFormInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            invalid={!!formErrors.email}
            feedback={formErrors.email}
          />

          <CFormLabel className="mt-3" htmlFor="opening_hours">Opening Hours</CFormLabel>
          <CFormInput
            name="opening_hours"
            value={formData.opening_hours}
            onChange={handleInputChange}
            placeholder="e.g., 9:00 AM - 10:00 PM"
          />

          <CFormLabel className="mt-3" htmlFor="manager_name">Manager Name</CFormLabel>
          <CFormInput
            name="manager_name"
            value={formData.manager_name}
            onChange={handleInputChange}
            placeholder="Enter manager name"
          />

          <CFormLabel className="mt-3" htmlFor="branch_opening_date">Branch Opening Date</CFormLabel>
          <CFormInput
            type="date"
            name="branch_opening_date"
            value={formData.branch_opening_date}
            onChange={handleInputChange}
          />

          <CFormLabel className="mt-3" htmlFor="branch_status">Branch Status</CFormLabel>
          <CFormSelect
            name="branch_status"
            value={formData.branch_status}
            onChange={handleInputChange}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="under_maintenance">Under Maintenance</option>
          </CFormSelect>

          <CRow className="g-3 mt-1">
            <CCol md={6}>
              <CFormLabel htmlFor="seating_capacity">Seating Capacity</CFormLabel>
              <CFormInput
                type="number"
                name="seating_capacity"
                value={formData.seating_capacity}
                onChange={handleInputChange}
                placeholder="Enter seating capacity"
                min="0"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Facilities</CFormLabel>
              <div className="d-flex flex-column">
                <CFormCheck
                  name="parking_availability"
                  label="Parking Available"
                  checked={formData.parking_availability}
                  onChange={handleInputChange}
                />
                <CFormCheck
                  name="wifi_availability"
                  label="WiFi Available"
                  checked={formData.wifi_availability}
                  onChange={handleInputChange}
                />
              </div>
            </CCol>
          </CRow>

       
        </CCol>
      </CRow>

      <CModalFooter className="mt-4">
        <CButton color="secondary" variant="outline" onClick={() => setIsModalOpen(false)}>
          Cancel
        </CButton>
        <CButton type="submit" color="primary" disabled={isLoading}>
          {isLoading ? <CSpinner size="sm" /> : currentBranch ? "Update Branch" : "Add Branch"}
        </CButton>
      </CModalFooter>
    </CForm>
  </CModalBody>
</CModal>


      {/* View Branch Modal */}
      <CModal 
        visible={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Branch Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {currentBranch && (
            <CRow>
              <CCol md={5}>
                <div className="text-center mb-4">
                  {currentBranch.image_url ? (
                    <CImage
                      src={`${BASE_URL}${currentBranch.image_url}`}
                      alt={currentBranch.name}
                      fluid
                      thumbnail
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                  ) : (
                    <div className="text-muted p-5 border rounded">
                      <CIcon icon={cilBuilding} size="xxl" />
                      <p>No image available</p>
                    </div>
                  )}
                </div>
                <CListGroup>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilUser} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Manager</small>
                        <div>{currentBranch.manager_name || "Not specified"}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCalendar} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Opening Date</small>
                        <div>{currentBranch.branch_opening_date || "Not specified"}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilClock} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Opening Hours</small>
                        <div>{currentBranch.opening_hours || "Not specified"}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <CIcon icon={cilCheckCircle} className="me-3 text-primary" />
                      <div>
                        <small className="text-muted">Status</small>
                        <div>{getStatusBadge(currentBranch.branch_status)}</div>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex align-items-center">
                      <div>
                        <small className="text-muted">Facilities</small>
                        <div>
                          {currentBranch.parking_availability && (
                            <CBadge color="success" className="me-2">Parking</CBadge>
                          )}
                          {currentBranch.wifi_availability && (
                            <CBadge color="success">WiFi</CBadge>
                          )}
                          {!currentBranch.parking_availability && !currentBranch.wifi_availability && (
                            <span className="text-muted">No facilities specified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={7}>
                <h4>{currentBranch.name}</h4>
                <div className="mb-4">
                  <h6 className="text-muted">Location Information</h6>
                  <p>
                    <strong>Address:</strong> {currentBranch.address}
                  </p>
                  <p>
                    <strong>City:</strong> {currentBranch.city}
                  </p>
                  <p>
                    <strong>State:</strong> {currentBranch.state || "Not specified"}
                  </p>
                  <p>
                    <strong>Country:</strong> {currentBranch.country}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {currentBranch.zipcode || "Not specified"}
                  </p>
                  <p>
                    <strong>Coordinates:</strong> {currentBranch.latitude}, {currentBranch.longitude}
                  </p>
                </div>
                <div className="mb-4">
                  <h6 className="text-muted">Contact Information</h6>
                  <p>
                    <strong>Phone:</strong> {currentBranch.phone_number || "Not specified"}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentBranch.email || "Not specified"}
                  </p>
                </div>
                <div className="mb-4">
                  <h6 className="text-muted">Capacity</h6>
                  <p>
                    <strong>Seating Capacity:</strong> {currentBranch.seating_capacity || "Not specified"}
                  </p>
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
          <CButton 
            color="warning" 
            onClick={() => {
              setIsViewModalOpen(false);
              openModal(currentBranch);
            }}
          >
            <CIcon icon={cilPencil} className="me-2" />
            Edit Branch
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal 
        visible={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        alignment="center"
      >
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-center">
          {currentBranch && (
            <>
              <CIcon icon={cilWarning} size="3xl" className="text-danger mb-3" />
              <h5>Are you sure you want to delete this branch?</h5>
              <p className="text-muted">
                {currentBranch.name} in {currentBranch.city}, {currentBranch.country}
              </p>
              <p className="text-danger">
                <strong>This action cannot be undone.</strong>
              </p>
            </>
          )}
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton 
            color="secondary" 
            onClick={() => setIsDeleteModalOpen(false)}
            className="me-3"
          >
            Cancel
          </CButton>
          <CButton 
            color="danger" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <CSpinner size="sm" />
            ) : (
              <>
                <CIcon icon={cilTrash} className="me-2" />
                Delete Branch
              </>
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

export default Branches;