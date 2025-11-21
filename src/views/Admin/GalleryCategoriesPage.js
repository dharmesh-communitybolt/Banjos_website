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
  CFormLabel,
  CImage,
  CBadge,
  CSpinner,
  CInputGroup,
  CInputGroupText,
  CCard,
  CCardHeader,
  CCardBody,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CRow,
  CCol,
  CPagination,
  CPaginationItem,
  CTooltip
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilSearch,
  cilImage,
  cilWarning,
  cilInfo,
  cilX,
  cilCheckCircle
} from '@coreui/icons';
import { format } from 'date-fns';
import { BASE_URL } from '../../config'; 
const GalleryCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: null
  });


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/gallery_cat/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch categories. Please try again later.
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    let result = [...categories];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(category => 
        category.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredCategories(result);
    setCurrentPage(1);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: null
    });
    setImagePreview(null);
    setCurrentImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (selectedCategory) {
        await axios.put(
          `${BASE_URL}/gallery_cat/categories/${selectedCategory.id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Category updated successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      } else {
        await axios.post(
          `${BASE_URL}/gallery_cat/categories/add`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Category added successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      }
      
      fetchCategories();
      setModalVisible(false);
      setSelectedCategory(null);
      resetForm();
    } catch (err) {
      console.error('Failed to save category:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || 'Failed to save category. Please try again.'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/gallery_cat/categories/${id}`);
      fetchCategories();
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Category deleted successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete category:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to delete category. Please try again.
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      image: null
    });
    setCurrentImage(category.image_url);
    setModalVisible(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="gallery-categories-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilImage} className="me-2 text-primary" />
                Gallery Categories Management
              </h4>
              <small className="text-muted">Manage your gallery categories and images</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              {/* <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={fetchCategories}
                disabled={loading}
                className="me-2"
              >
                {loading ? <CSpinner size="sm" /> : "Refresh"} */}
              {/* </CButton> */}
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={() => { setSelectedCategory(null); setModalVisible(true); }}
                shape="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Category
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            <CCol xs={12}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Search by category name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-end"
                />
              </CInputGroup>
            </CCol>
          </CRow>

          {loading && !categories.length ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-5">
              <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
              <h5>No categories found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try adjusting your search' : 'Add your first category to get started'}
              </p>
              <CButton 
                style={{ backgroundColor: "#f0e70c", color: "black" }}
                onClick={() => { setSelectedCategory(null); setModalVisible(true); }}
                className="mt-2"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Category
              </CButton>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <small className="text-medium-emphasis">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} categories
                  {searchTerm && ' (filtered)'}
                </small>
              </div>

              <div className="table-responsive">
                <CTable striped hover responsive className="table-borderless">
                  <CTableHead className="bg-light">
                    <CTableRow>
                      <CTableHeaderCell>Image</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Created At</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentItems.map((category) => (
                      <CTableRow key={category.id} className="align-middle">
                        <CTableDataCell>
                          {category.image_url ? (
                            <CImage
                              thumbnail
                              src={`${BASE_URL}${category.image_url}`}
                              width={50}
                              height={50}
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <CBadge color="secondary">No Image</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{category.name}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          {format(new Date(category.created_at), 'MMM dd, yyyy')}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="outline-warning"
                            size="sm"
                            onClick={() => openEditModal(category)}
                            className="me-2"
                            title="Edit"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="outline-danger"
                            size="sm"
                            onClick={() => setDeleteConfirm(category.id)}
                            title="Delete"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>

                          {deleteConfirm === category.id && (
                            <div className="mt-2 p-2 bg-light rounded">
                              <p className="mb-2 small">Are you sure you want to delete this category?</p>
                              <div className="d-flex gap-2">
                                <CButton
                                  size="sm"
                                  color="danger"
                                  onClick={() => handleDelete(category.id)}
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

      {/* Add/Edit Category Modal */}
      <CModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); resetForm(); }}
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>{selectedCategory ? "Edit" : "Add"} Gallery Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Category Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>
                    {selectedCategory ? 'Update Image' : 'Upload Image *'}
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!selectedCategory}
                  />
                  
                  {(imagePreview || (selectedCategory?.image_url && !formData.image)) && (
                    <div className="mt-3">
                      <p className="small text-muted">Image Preview:</p>
                      <CImage
                        thumbnail
                        src={imagePreview || `${BASE_URL}${selectedCategory.image_url}`}
                        width={200}
                        height={200}
                        className="border p-1"
                      />
                    </div>
                  )}
                </div>
              </CCol>
            </CRow>
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
                type="submit"
                color="primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    {selectedCategory ? ' Updating...' : ' Creating...'}
                  </>
                ) : selectedCategory ? (
                  'Save Changes'
                ) : (
                  'Add Category'
                )}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default GalleryCategoriesPage;