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
  CFormCheck,
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CImage,
  CBadge,
  CInputGroup,
  CInputGroupText,
  CToaster,
  CToast,
  CToastBody,
  CToastClose,
  // Add these missing imports
  CCallout,
  CFormLabel,
  CFormTextarea
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash, cilSearch, cilImage, cilInfo, cilWarning } from '@coreui/icons';
import { BASE_URL } from '../../config'; 

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_name: '',
    price: '',
    parcel_price: '',
    image: null,
    is_available: true,
    is_veg: true,
  });

 

  // Fetch menu items
  const fetchMenuItems = async (category = '') => {
    setIsLoading(true);
    try {
      const url = category
        ? `${BASE_URL}/menu/category/${category}`
        : `${BASE_URL}/menu`;
      const response = await axios.get(url);
      setMenuItems(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch menu items:', err);
      setError('Failed to fetch menu items. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to fetch categories. Please try again later.');
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category_name: '',
      price: '',
      parcel_price: '',
      image: null,
      is_available: true,
      is_veg: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category_name', formData.category_name);
      
      // Handle price
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue)) {
        throw new Error('Price must be a valid number');
      }
      formDataToSend.append('price', priceValue);
      
      // Handle parcel price
      const parcelPriceValue = formData.parcel_price === '' ? null : parseFloat(formData.parcel_price);
      formDataToSend.append('parcel_price', parcelPriceValue === null || isNaN(parcelPriceValue) ? null : parcelPriceValue);
      
      // Boolean values
      formDataToSend.append('is_available', formData.is_available);
      formDataToSend.append('is_veg', formData.is_veg);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(`${BASE_URL}/menu/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchMenuItems();
        setModalVisible(false);
        resetForm();
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilInfo} className="me-2" />
            Menu item added successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      }
    } catch (err) {
      console.error('Error adding menu item:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || err.message || 'Failed to add menu item'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    }
  };

  const handleEditMenuItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category_name', formData.category_name);
      
      // Handle price
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue)) {
        throw new Error('Price must be a valid number');
      }
      formDataToSend.append('price', priceValue);
      
      // Handle parcel price
      const parcelPriceValue = formData.parcel_price === '' ? null : parseFloat(formData.parcel_price);
      formDataToSend.append('parcel_price', parcelPriceValue === null || isNaN(parcelPriceValue) ? null : parcelPriceValue);
      
      // Boolean values
      formDataToSend.append('is_available', formData.is_available);
      formDataToSend.append('is_veg', formData.is_veg);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.put(
        `${BASE_URL}/menu/${selectedMenuItem.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        fetchMenuItems();
        setEditModalVisible(false);
        setSelectedMenuItem(null);
        resetForm();
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilInfo} className="me-2" />
            Menu item updated successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      }
    } catch (err) {
      console.error('Error updating menu item:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || err.message || 'Failed to update menu item'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
      await axios.delete(`${BASE_URL}/menu/${id}`);
      fetchMenuItems();
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilInfo} className="me-2" />
          Menu item deleted successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          {err.response?.data?.detail || 'Failed to delete menu item'}
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    }
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchMenuItems(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                         item.description.toLowerCase().includes(searchTerm) ||
                         item.category_name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory ? item.category_name === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const openViewModal = (item) => {
    setSelectedMenuItem(item);
    setViewModalVisible(true);
  };

  return (
    <div className="menu-management">
      <CCard className="mb-4">
        <CCardHeader className="bg-white">
          <CRow className="align-items-center">
            <CCol xs={12} md={6}>
              <h4 className="mb-0">
                <CIcon icon={cilInfo} className="me-2 text-primary" />
                Menu Management
              </h4>
              <small className="text-muted">Manage your restaurant menu items</small>
            </CCol>
            <CCol xs={12} md={6} className="text-md-end mt-3 mt-md-0">
              <CButton 
               style={{ backgroundColor: "#f0e70c ", Color: "black"}}

                onClick={() => setModalVisible(true)}
                shape="rounded-pill"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add Menu Item
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
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="rounded-end"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12} lg={6} className="mt-3 mt-lg-0">
             
              <CFormSelect
              
                value={selectedCategory}
                onChange={handleCategoryFilter}
                className="form-select-md mb-2"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {isLoading ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2">Loading menu items...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <CTable striped hover responsive className="table-borderless">
                <CTableHead className="bg-light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Category</CTableHeaderCell>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableHeaderCell>Parcel Price</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => (
                      <CTableRow key={item.id} className="align-middle">
                        <CTableDataCell>
                          <strong>{item.name}</strong>
                        </CTableDataCell>
                        <CTableDataCell className="text-truncate" style={{ maxWidth: '200px' }}>
                          {item.description}
                        </CTableDataCell>
                        <CTableDataCell>{item.category_name}</CTableDataCell>
                        <CTableDataCell>₹{item.price.toFixed(2)}</CTableDataCell>
                        <CTableDataCell>
                          {item.parcel_price !== null ? `₹${item.parcel_price.toFixed(2)}` : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.image_url ? (
                            <CImage
                              src={`${BASE_URL}${item.image_url}`}
                              alt={item.name}
                              thumbnail
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          ) : (
                            <CIcon icon={cilImage} size="xl" className="text-muted" />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={item.is_veg ? 'success' : 'danger'}>
                            {item.is_veg ? 'Veg' : 'Non-Veg'}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={item.is_available ? 'success' : 'secondary'}>
                            {item.is_available ? 'Available' : 'Unavailable'}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="outline-info"
                            size="sm"
                            onClick={() => openViewModal(item)}
                            className="me-2"
                            title="View Details"
                          >
                            <CIcon icon={cilInfo} />
                          </CButton>
                          <CButton
                            color="outline-warning"
                            size="sm"
                            onClick={() => {
                              setSelectedMenuItem(item);
                              setFormData({
                                name: item.name,
                                description: item.description,
                                category_name: item.category_name,
                                price: item.price.toString(),
                                parcel_price: item.parcel_price !== null ? item.parcel_price.toString() : '',
                                image: null,
                                is_available: item.is_available,
                                is_veg: item.is_veg,
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
                            onClick={() => handleDeleteMenuItem(item.id)}
                            title="Delete"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={9} className="text-center py-5">
                        <CIcon icon={cilWarning} size="xl" className="text-warning mb-2" />
                        <h5>No menu items found</h5>
                        <p className="text-muted">
                          {searchTerm ? 'Try a different search term' : 'Add your first menu item to get started'}
                        </p>
                        <CButton 
                            
                           onClick={() => setModalVisible(true)}
                          className="btn btn-danger mt-2"
                        >
                          <CIcon icon={cilPlus} className="me-2" />
                          Add Menu Item
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

      {/* Add Menu Item Modal */}
      <CModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add New Menu Item</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddMenuItem}>
            <CRow>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormLabel htmlFor="name">Item Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    placeholder="e.g., Margherita Pizza"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="description">Description *</CFormLabel>
                  <CFormTextarea
                    name="description"
                    placeholder="Describe the item (ingredients, serving size, etc.)"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="category_name">Category *</CFormLabel>
                  <CFormSelect
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormLabel htmlFor="price">Price (₹) *</CFormLabel>
                  <CFormInput
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="parcel_price">Parcel Price (₹)</CFormLabel>
                  <CFormInput
                    type="number"
                    name="parcel_price"
                    placeholder="Optional"
                    value={formData.parcel_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="image">Item Image *</CFormLabel>
                  <CFormInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <CImage
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        thumbnail
                        style={{ maxWidth: '150px' }}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <CFormCheck
                    label="Vegetarian"
                    name="is_veg"
                    checked={formData.is_veg}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="mb-4">
                  <CFormCheck
                    label="Available Now"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </CCol>
            </CRow>
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
                Add Item
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Menu Item Modal */}
      <CModal 
        visible={editModalVisible} 
        onClose={() => setEditModalVisible(false)} 
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit Menu Item</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditMenuItem}>
            <CRow>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormLabel htmlFor="editName">Item Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    placeholder="Item name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="editDescription">Description *</CFormLabel>
                  <CFormTextarea
                    name="description"
                    placeholder="Item description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="editCategory">Category *</CFormLabel>
                  <CFormSelect
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-4">
                  <CFormLabel htmlFor="editPrice">Price (₹) *</CFormLabel>
                  <CFormInput
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="editParcelPrice">Parcel Price (₹)</CFormLabel>
                  <CFormInput
                    type="number"
                    name="parcel_price"
                    placeholder="Optional"
                    value={formData.parcel_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-4">
                  <CFormLabel htmlFor="editImage">Update Image</CFormLabel>
                  <CFormInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {selectedMenuItem?.image_url && !formData.image && (
                    <div className="mt-2">
                      <CImage
                        src={`${BASE_URL}${selectedMenuItem.image_url}`}
                        alt="Current"
                        thumbnail
                        style={{ maxWidth: '150px' }}
                      />
                      <small className="text-muted">Current image</small>
                    </div>
                  )}
                  {formData.image && (
                    <div className="mt-2">
                      <CImage
                        src={URL.createObjectURL(formData.image)}
                        alt="New"
                        thumbnail
                        style={{ maxWidth: '150px' }}
                      />
                      <small className="text-muted">New image</small>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <CFormCheck
                    label="Vegetarian"
                    name="is_veg"
                    checked={formData.is_veg}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="mb-4">
                  <CFormCheck
                    label="Available Now"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </CCol>
            </CRow>
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
                Update Item
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* View Modal */}
      <CModal visible={viewModalVisible} onClose={() => setViewModalVisible(false)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Menu Item Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedMenuItem && (
            <CRow>
              <CCol md={6}>
                <h4>{selectedMenuItem.name}</h4>
                <p className="text-muted">{selectedMenuItem.description}</p>
                <dl className="row">
                  <dt className="col-sm-4">Category:</dt>
                  <dd className="col-sm-8">{selectedMenuItem.category_name}</dd>

                  <dt className="col-sm-4">Price:</dt>
                  <dd className="col-sm-8">₹{selectedMenuItem.price.toFixed(2)}</dd>

                  <dt className="col-sm-4">Parcel Price:</dt>
                  <dd className="col-sm-8">
                    {selectedMenuItem.parcel_price ? 
                      `₹${selectedMenuItem.parcel_price.toFixed(2)}` : 'N/A'}
                  </dd>

                  <dt className="col-sm-4">Food Type:</dt>
                  <dd className="col-sm-8">
                    <CBadge color={selectedMenuItem.is_veg ? 'success' : 'danger'}>
                      {selectedMenuItem.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </CBadge>
                  </dd>

                  <dt className="col-sm-4">Availability:</dt>
                  <dd className="col-sm-8">
                    <CBadge color={selectedMenuItem.is_available ? 'success' : 'secondary'}>
                      {selectedMenuItem.is_available ? 'Available' : 'Unavailable'}
                    </CBadge>
                  </dd>
                </dl>
              </CCol>
              <CCol md={6} className="text-center">
                {selectedMenuItem.image_url ? (
                  <CImage
                    src={`${BASE_URL}${selectedMenuItem.image_url}`}
                    alt={selectedMenuItem.name}
                    fluid
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="text-muted p-5 border rounded">
                    <CIcon icon={cilImage} size="xxl" />
                    <p>No image available</p>
                  </div>
                )}
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setViewModalVisible(false)}>
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

export default MenuManagement;