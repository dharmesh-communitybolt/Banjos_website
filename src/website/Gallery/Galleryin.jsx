import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Gallerybg from '../../assets/img/galleryb.jpg';
import './Gallery.css'; // Create this CSS file for additional styles
import { BASE_URL } from '../../config';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(`${BASE_URL}/gallery_cat/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch images
        const imagesResponse = await fetch(`${BASE_URL}/images/images/`);
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        // Set first category as active by default
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const filteredImages = activeCategory 
    ? images.filter(img => img.category_id === activeCategory)
    : images;

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Loading State */}
      {loading && (
        <motion.div 
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="loading-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.img 
              src="/pizza.gif"
              alt="Loading ..."
              className="loading-gif"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="loading-text"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              Preparing Your Gallery...
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Banner Section */}
      <motion.div 
        style={styles.bannerContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={Gallerybg}
          alt="Gallery Banner" 
          style={styles.bannerImage}
        />
        <div style={styles.bannerOverlay}>
          <motion.h1 
            style={styles.bannerTitle}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Culinary Gallery
          </motion.h1>
          <motion.p 
            style={styles.bannerText}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A visual feast of our most exquisite creations
          </motion.p>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.section 
        style={styles.gallerySection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 style={styles.mainTitle}>GALLERY</h2>
            <div style={styles.titleUnderline}></div>
            
            <motion.h3 
              style={styles.checkOurGallery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Discover Our Culinary Art
            </motion.h3>
          </motion.div>

          <motion.div 
            style={styles.categoryFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {categories.map(category => (
              <motion.button
                key={category.id}
                style={activeCategory === category.id ? 
                  {...styles.categoryButton, ...styles.activeCategoryButton} : 
                  styles.categoryButton}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            style={styles.galleryGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div 
                  key={image.id} 
                  style={styles.galleryItem} 
                  onClick={() => openImageModal(image)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 100
                  }}
                  layout
                >
                  <div style={styles.imageContainer}>
                    <motion.img 
                      src={`${BASE_URL}${image.file_path.startsWith('/') ? '' : '/'}${image.file_path}`} 
                      alt={image.name} 
                      style={styles.galleryImage}
                      loading="lazy"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div style={styles.imageOverlay}>
                      <h3 style={styles.imageTitle}>{image.name}</h3>
                      {image.description && (
                        <p style={styles.imageDescription}>{image.description}</p>
                      )}
                      <motion.div
                        style={styles.viewButton}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        View
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {isModalOpen && selectedImage && (
            <motion.div 
              style={styles.modalOverlay} 
              onClick={closeImageModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                style={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.button 
                  style={styles.closeButton} 
                  onClick={closeImageModal}
                  whileHover={{ backgroundColor: '#e4141c' }}
                >
                  &times;
                </motion.button>
                <img
                  src={`${BASE_URL}${selectedImage.file_path.startsWith('/') ? '' : '/'}${selectedImage.file_path}`}
                  alt={selectedImage.name}
                  style={styles.modalImage}
                />
                <div style={styles.modalText}>
                  <h3 style={styles.modalTitle}>{selectedImage.name}</h3>
                  {selectedImage.description && (
                    <p style={styles.modalDescription}>{selectedImage.description}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};




// Modern Gallery Styles
const styles = {
  // Banner Styles
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: '60vh',
    minHeight: '400px',
    maxHeight: '700px',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7)',
  },
  bannerOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
  },
  bannerTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
    color: '#f0e70c',
    fontFamily: '"Playfair Display", serif',
    letterSpacing: '1px',
  },
  bannerText: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    fontWeight: '400',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '"Poppins", sans-serif',
    lineHeight: '1.6',
  },
  
  // Gallery Styles
  gallerySection: {
    padding: '80px 0',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  mainTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: 'rgb(26, 24, 20)',
    marginBottom: '15px',
    position: 'relative',
    textAlign: 'center',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  titleUnderline: {
    width: '80px',
    height: '3px',
    backgroundColor: '#f0e70c',
    margin: '0 auto 40px',
    textAlign: 'center',
  },
  checkOurGallery: {
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '40px',
    background: 'linear-gradient(135deg, #333 0%, #f0e70c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    textAlign: 'center',
    fontFamily: '"Playfair Display", serif',
  },
  categoryFilter: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '40px',
  },
  categoryButton: {
    padding: '12px 25px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    fontFamily: '"Poppins", sans-serif',
  },
  activeCategoryButton: {
    backgroundColor: '#f0e70c',
    color: '#333',
    borderColor: '#f0e70c',
    boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
  },
  galleryItem: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#fff',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '280px',
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    'div:hover &': {
      opacity: 1,
    },
  },
  imageTitle: {
    margin: '0 0 10px',
    fontSize: '20px',
    fontWeight: '600',
    transform: 'translateY(20px)',
    transition: 'transform 0.3s ease',
    'div:hover &': {
      transform: 'translateY(0)',
    },
  },
  imageDescription: {
    margin: '0',
    fontSize: '14px',
    opacity: 0.8,
    transform: 'translateY(20px)',
    transition: 'transform 0.3s ease 0.1s',
    'div:hover &': {
      transform: 'translateY(0)',
    },
  },
  viewButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
    padding: '10px 25px',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    backdropFilter: 'blur(5px)',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  modalImage: {
    width: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
  },
  modalText: {
    padding: '30px',
    textAlign: 'center',
  },
  modalTitle: {
    margin: '0 0 15px',
    fontSize: '28px',
    color: '#333',
    fontFamily: '"Playfair Display", serif',
  },
  modalDescription: {
    margin: '0',
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.8',
    maxWidth: '600px',
    margin: '0 auto',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '28px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
};

export default Gallery;