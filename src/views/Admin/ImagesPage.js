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
  CAlert,
  CImage,
  CTooltip,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CBadge,
  CInputGroup,
  CInputGroupText,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  CFormLabel,
  CFormTextarea,
  CCallout
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilSearch,
  cilInfo,
  cilWarning,
  cilCheckCircle,
  cilImage as cilImageIcon,
  cilFolder
} from '@coreui/icons';
import { BASE_URL } from '../../config'; 
const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    categoryName: '',
    description: '',
  });


  // Fetch images and categories
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/images/images/`);
      setImages(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch images:', err);
      setError('Failed to fetch images. Please try again later.');
      showToast('Failed to fetch images. Please try again later.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/gallery_cat/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to fetch categories. Please try again later.');
      showToast('Failed to fetch categories. Please try again later.', 'danger');
    }
  };

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const showToast = (message, color) => {
    setToast(
      <CToast color={color} visible={true}>
        <CToastBody>
          <CIcon icon={color === 'danger' ? cilWarning : cilCheckCircle} className="me-2" />
          {message}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: null,
      categoryName: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.name === formData.categoryName);
    if (!selectedCategory) {
      showToast('Please select a valid category.', 'danger');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.image);
    if (formData.description) {
      formDataToSend.append('description', formData.description);
    }

    try {
      await axios.post(
        `${BASE_URL}/images/images/add?name=${formData.name}&category_id=${selectedCategory.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchImages();
      setModalVisible(false);
      resetForm();
      showToast('Image added successfully!', 'success');
    } catch (err) {
      console.error('Failed to add image:', err);
      showToast('Failed to add image. Please try again.', 'danger');
    }
  };

  const handleEditImage = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.name === formData.categoryName);
    if (!selectedCategory) {
      showToast('Please select a valid category.', 'danger');
      return;
    }

    const formDataToSend = new FormData();
    if (formData.image instanceof File) {
      formDataToSend.append('file', formData.image);
    }
    if (formData.description) {
      formDataToSend.append('description', formData.description);
    }

    try {
      await axios.put(
        `${BASE_URL}/images/images/${selectedImage.id}?name=${formData.name}&category_id=${selectedCategory.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchImages();
      setEditModalVisible(false);
      setSelectedImage(null);
      resetForm();
      showToast('Image updated successfully!', 'success');
    } catch (err) {
      console.error('Failed to update image:', err);
      showToast('Failed to update image. Please try again.', 'danger');
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) return;
    
    try {
      await axios.delete(`${BASE_URL}/images/images/${id}`);
      fetchImages();
      showToast('Image deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete image:', err);
      showToast('Failed to delete image. Please try again.', 'danger');
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === '' || 
                          (image.category_id && categories.find(cat => String(cat.id) === String(image.category_id))?.name === categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="images-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilImageIcon} className="me-2 text-primary" />
                Images Management
              </h4>
              <small className="text-muted">Manage your gallery images</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <CButton 
                style={{ backgroundColor: "#f0e70c" }}
                onClick={() => setModalVisible(true)}
                shape="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add New Image
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {/* <CCallout color="info" className="mb-4">
            <strong>Tip:</strong> Upload high-quality images and organize them into categories for better gallery presentation.
          </CCallout> */}

          <CRow className="mb-4">
            <CCol xs={12} lg={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-end"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
              <div className="d-flex justify-content-lg-end">
                <CFormSelect
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ width: '200px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
                {/* <CBadge color="info" className="ms-3 align-self-center">
                  Total Images: {filteredImages.length}
                </CBadge> */}
              </div>
            </CCol>
          </CRow>

          {isLoading ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading images...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell width={60}>#</CTableHeaderCell>
                    <CTableHeaderCell>Image Name</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CIcon icon={cilFolder} className="me-1" />
                      Category
                    </CTableHeaderCell>
                    <CTableHeaderCell>Preview</CTableHeaderCell>
                    <CTableHeaderCell width={150} className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredImages.length > 0 ? (
                    filteredImages.map((image, index) => (
                      <CTableRow key={image.id} className="align-middle">
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>
                          <strong>{image.name}</strong>
                          {image.description && (
                            <div className="text-muted small mt-1">
                              {image.description.length > 50 
                                ? `${image.description.substring(0, 50)}...` 
                                : image.description}
                            </div>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {categories.find((cat) => String(cat.id) === String(image.category_id))?.name || 'Uncategorized'}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CImage
                            src={`${BASE_URL}/${image.file_path}`}
                            alt={image.name}
                            thumbnail
                            width={80}
                            height={60}
                          />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="outline-warning"
                            size="sm"
                            onClick={() => {
                              setSelectedImage(image);
                              setFormData({
                                name: image.name,
                                image: null,
                                categoryName: categories.find((cat) => String(cat.id) === String(image.category_id))?.name || '',
                                description: image.description || '',
                              });
                              setEditModalVisible(true);
                            }}
                            className="me-2"
                            title="Edit"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteImage(image.id)}
                            title="Delete"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={5} className="text-center py-5">
                        <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
                        <h5>No images found</h5>
                        <p className="text-muted">
                          {searchTerm || categoryFilter ? 'Try different search/filter terms' : 'Add your first image to get started'}
                        </p>
                        <CButton 
                          color="primary" 
                          onClick={() => setModalVisible(true)}
                          className="mt-2"
                        >
                          <CIcon icon={cilPlus} className="me-2" />
                          Add Image
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </div>
          )}
        </CCardBody>
      </CCard>

      {/* Add Image Modal */}
      <CModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CIcon icon={cilPlus} className="me-2"  style={{ backgroundColor: "#f0e70c" }}  />
            Add New Image
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddImage}>
            <div className="mb-4">
              <CFormLabel htmlFor="name">Image Name *</CFormLabel>
              <CFormInput
                type="text"
                id="name"
                name="name"
                placeholder="Enter image name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-control-lg"
              />
            </div>
            <div className="mb-4">
              <CFormLabel htmlFor="image">Image File *</CFormLabel>
              <CFormInput
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="form-control-lg"
              />
              {formData.image instanceof File && (
                <div className="mt-2">
                  <CImage
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    thumbnail
                    width={150}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <CFormLabel htmlFor="categoryName">Category *</CFormLabel>
              <CFormSelect
                id="categoryName"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                required
                className="form-control-lg"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-4">
              <CFormLabel htmlFor="description">Description (Optional)</CFormLabel>
              <CFormTextarea
                id="description"
                name="description"
                placeholder="Enter description (optional)"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <CModalFooter>
              <CButton 
                color="secondary" 
                onClick={() => setModalVisible(false)}
                variant="outline"
              >
                Cancel
              </CButton>
              <CButton 
                color="primary" 
                type="submit"
                className="px-4"
              >
                Add Image
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Image Modal */}
      {selectedImage && (
        <CModal 
          visible={editModalVisible} 
          onClose={() => setEditModalVisible(false)}
          size="lg"
          backdrop="static"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <CIcon icon={cilPencil} className="me-2" />
              Edit Image
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleEditImage}>
              <div className="mb-4">
                <CFormLabel htmlFor="editName">Image Name *</CFormLabel>
                <CFormInput
                  type="text"
                  id="editName"
                  name="name"
                  placeholder="Enter image name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control-lg"
                />
              </div>
              <div className="mb-4">
                <CFormLabel htmlFor="editImage">New Image (Optional)</CFormLabel>
                <CFormInput
                  type="file"
                  id="editImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control-lg"
                />
                {formData.image instanceof File ? (
                  <div className="mt-2">
                    <CImage
                      src={URL.createObjectURL(formData.image)}
                      alt="New Preview"
                      thumbnail
                      width={150}
                    />
                    <small className="text-muted">New image selected</small>
                  </div>
                ) : (
                  <div className="mt-2">
                    <CImage
                      src={`${BASE_URL}/${selectedImage.file_path}`}
                      alt="Current"
                      thumbnail
                      width={150}
                    />
                    <small className="text-muted">Current image</small>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <CFormLabel htmlFor="editCategoryName">Category *</CFormLabel>
                <CFormSelect
                  id="editCategoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                  className="form-control-lg"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-4">
                <CFormLabel htmlFor="editDescription">Description (Optional)</CFormLabel>
                <CFormTextarea
                  id="editDescription"
                  name="description"
                  placeholder="Enter description (optional)"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <CModalFooter>
                <CButton 
                  color="secondary" 
                  onClick={() => setEditModalVisible(false)}
                  variant="outline"
                >
                  Cancel
                </CButton>
                <CButton 
                  color="primary" 
                  type="submit"
                  className="px-4"
                >
                  Update Image
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      )}

      <CToaster placement="top-end">
        {toast}
      </CToaster>
    </div>
  );
};

export default ImagesPage;