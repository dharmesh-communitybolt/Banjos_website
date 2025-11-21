
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import frncies from '../../assets/img/francies.jpg';
import './Branches.css'; // Create this CSS file for additional styles
import NearbyBranches  from './NearbyBranches';
import { BASE_URL } from '../../config';
// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

const Branches = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [branches, setBranches] = useState([]);
  const [orderLinks, setOrderLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branches from API
  // Fetch branches from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${BASE_URL}/branches/`);
        if (!response.ok) {
          throw new Error('Failed to fetch branches');
        }
        const data = await response.json();
        setBranches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Fetch order links from API
  useEffect(() => {
    const fetchOrderLinks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/online-order-links/`);
        const text = await response.text();  // Read as text first
        console.log('Raw response:', text);
    
        const data = JSON.parse(text); // Try parsing manually
        setOrderLinks(data);
      } catch (err) {
        console.error('Error fetching order links:', err);
      }
    };
    fetchOrderLinks();
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const openOrderModal = (branch) => {
    setCurrentBranch(branch);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(`${BASE_URL}${imageUrl}`);
  };


  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const filteredBranches = activeFilter === 'all' 
    ? branches 
    : branches.filter(branch => branch.city === activeFilter);

  if (loading) {
    return (
      <section id="menu" className="menu section">
        <div className="container text-center py-5">
          <motion.div 
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/pizza.gif"
              alt="Loading menu..." 
              className="loading-gif"
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
              Preparing Your Menu...
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <motion.section 
        id="branches" 
        style={styles.errorContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p style={styles.errorText}>Error: {error}</p>
      </motion.section>
    );
  }

  return (
    <section id="branches" className="branches" style={styles.portfolio}>
      {/* Banner Section */}
      <motion.div 
        style={styles.bannerContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={frncies}
          alt="Our Branches" 
          style={styles.bannerImage}
        />
        <div style={styles.bannerOverlay}>
          <motion.h1 
            style={styles.bannerTitle}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Branches
          </motion.h1>
          <motion.p 
            style={styles.bannerText}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our delicious food at a location near you
          </motion.p>
        </div>
      </motion.div>
        {/* <NearbyBranches/> */}
      {/* Section Title */}
      {/* <motion.div 
        className="section-title" 
        style={styles.sectionTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 style={styles.sectionTitleH2}>Find Your Nearest Branch</h2>
        <div className="title-shape" style={styles.titleShape}>
          <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="#e4141c" strokeWidth="2"></path>
          </svg>
        </div>
        <p style={styles.sectionTitleP}>Find your nearest branch and enjoy our signature dishes anytime.</p>
      </motion.div> */}

      <div className="container" style={styles.container}>
        {/* Filter Buttons */}
        <motion.div 
          className="portfolio-filters-container" 
          style={styles.filtersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <ul className="portfolio-filters" style={styles.filtersList}>
            <motion.li 
              style={activeFilter === 'all' ? {...styles.filterItem, ...styles.filterItemActive} : styles.filterItem}
              onClick={() => handleFilterClick('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Branches
            </motion.li>
            {[...new Set(branches.map(branch => branch.city))].map(city => (
              <motion.li 
                key={city}
                style={activeFilter === city ? {...styles.filterItem, ...styles.filterItemActive} : styles.filterItem}
                onClick={() => handleFilterClick(city)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {city}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Branch Cards */}
        <div className="portfolio-grid" style={styles.portfolioGrid}>
          <AnimatePresence>
            {filteredBranches.map((branch, index) => (
              <motion.div 
                key={branch.id} 
                className="portfolio-item" 
                style={styles.portfolioItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                exit={{ opacity: 0 }}
                layout
              >
                <div className="portfolio-card" style={styles.portfolioCard}>
                  <div className="portfolio-image" style={styles.portfolioImage}>
                    <img 
                      src={`${BASE_URL}${branch.image_url}`} 
                      className="img-fluid" 
                      alt={branch.name} 
                      loading="lazy" 
                      style={styles.portfolioImg}
                    />
                    <div className="portfolio-overlay" style={styles.portfolioOverlay}>
                      <div className="portfolio-actions" style={styles.portfolioActions}>
                        <motion.button 
                          className="preview-link"
                          style={styles.portfolioActionBtn}
                          onClick={() => openLightbox(branch.image_url)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="bi bi-eye" style={styles.portfolioActionIcon}></i>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-content" style={styles.portfolioContent}>
                    <span className="category" style={styles.portfolioCategory}>
                      {branch.city}, {branch.state}
                    </span>
                    <h3 style={styles.portfolioTitle}>{branch.name}</h3>
                    <div style={styles.branchDetails}>
                      <p style={styles.portfolioDescription}>
                        <i className="bi bi-geo-alt" style={styles.icon}></i> {branch.address}
                      </p>
                      <p style={styles.portfolioDescription}>
                        <i className="bi bi-clock" style={styles.icon}></i> {branch.opening_hours}
                      </p>
                      <p style={styles.portfolioDescription}>
                        <i className="bi bi-telephone" style={styles.icon}></i> {branch.phone_number}
                      </p>
                      <div style={styles.amenities}>
                        {branch.wifi_availability && (
                          <motion.span 
                            style={styles.amenity} 
                            title="WiFi Available"
                            whileHover={{ scale: 1.2 }}
                          >
                            <i className="bi bi-wifi" style={styles.icon}></i>
                          </motion.span>
                        )}
                        {branch.parking_availability && (
                          <motion.span 
                            style={styles.amenity} 
                            title="Parking Available"
                            whileHover={{ scale: 1.2 }}
                          >
                            <i className="bi bi-p-circle" style={styles.icon}></i>
                          </motion.span>
                        )}
                        <motion.span 
                          style={styles.amenity} 
                          title={`Seating Capacity: ${branch.seating_capacity}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <i className="bi bi-people" style={styles.icon}></i> {branch.seating_capacity}
                        </motion.span>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => openOrderModal(branch)}
                      style={styles.orderNowButton}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: '0 5px 15px rgba(255, 193, 7, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Order Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Order Options"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 style={styles.modalTitle}>Order from {currentBranch?.name}</h2>
          <p style={styles.modalSubtitle}>{currentBranch?.address}</p>
          <div style={styles.modalButtonsContainer}>
            {orderLinks
              .filter(link => link.branch_id === currentBranch?.id)
              .map(link => (
                <motion.a 
                  key={link.id}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.foodAppButton}
                  title={`Order on ${link.platform}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={`${BASE_URL}${link.logo}`}
                    alt={link.platform} 
                    style={styles.foodAppLogo}
                  />
                </motion.a>
              ))}
          </div>
          <motion.button 
            onClick={closeModal} 
            style={styles.closeModalButton}
            whileHover={{ backgroundColor: '#e0e0e0' }}
          >
            Close
          </motion.button>
        </motion.div>
      </Modal>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            className="lightbox-overlay" 
            style={styles.lightboxOverlay} 
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="lightbox-content" 
              style={styles.lightboxContent} 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button className="lightbox-close" style={styles.lightboxClose} onClick={closeLightbox}>
                &times;
              </button>
              <img src={lightboxImage} alt="Branch" style={styles.lightboxImg} />
            </motion.div>
          </motion.div>
        )}
           {/* Map */}
      {/* <div className="mt-5 mb-0" style={{ position: 'relative', zIndex: 1 }}>
        <iframe
          title="Location Map"
          style={{ width: "100%", height: "500px", border: 'none', borderRadius: '8px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}
         src="https://www.google.com/maps/d/u/0/embed?mid=1-ihulsNBqai5QC5sNQnqDmG994SvZdVR"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        

      </div> */}
      </AnimatePresence>
    </section>
  );
};

// Enhanced styles with modern design elements
const styles = {
  portfolio: {
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: '0 0 80px 0',
    scrollMarginTop: '90px',
    overflow: 'hidden',
  },
  // Banner Styles
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: '60vh',
    minHeight: '400px',
    maxHeight: '600px',
    overflow: 'hidden',
    marginBottom: '60px',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  bannerOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  },
  bannerTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
    color: '#d6ca14',
    letterSpacing: '1px',
    fontFamily: '"Playfair Display", serif',
  },
  bannerText: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    fontWeight: '400',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
    maxWidth: '800px',
    lineHeight: '1.6',
    fontFamily: '"Poppins", sans-serif',
  },
  errorContainer: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff',
    margin: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderLeft: '5px solid #e4141c',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '18px',
    fontWeight: '500',
  },
  sectionTitle: {
    textAlign: 'center',
    paddingBottom: '60px',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  sectionTitleH2: {
    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: '15px',
    background: 'linear-gradient(135deg, #333 0%, #d6ca14 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    fontFamily: '"Playfair Display", serif',
  },
  titleShape: {
    width: '200px',
    height: '20px',
    margin: '0 auto 20px',
    color: '#e4141c',
  },
  sectionTitleP: {
    margin: '15px auto 0',
    fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
    maxWidth: '700px',
    color: 'rgba(51, 51, 51, 0.8)',
    lineHeight: '1.8',
    fontFamily: '"Poppins", sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  filtersContainer: {
    marginBottom: '40px',
  },
  filtersList: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    padding: '0',
    margin: '0',
    listStyle: 'none',
  },
  filterItem: {
    fontSize: '15px',
    fontWeight: '600',
    padding: '10px 25px',
    cursor: 'pointer',
    borderRadius: '30px',
    backgroundColor: '#fff',
    color: '#333',
    transition: 'all 0.3s ease-in-out',
    border: 'none',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: '"Poppins", sans-serif',
  },
  filterItemActive: {
    backgroundColor: '#d6ca14',
    color: 'black',
    boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)',
  },
  portfolioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '30px',
  },
  portfolioItem: {
    transition: 'all 0.3s ease',
  },
  portfolioCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  portfolioImage: {
    position: 'relative',
    overflow: 'hidden',
    height: '220px',
    width: '100%',
  },
  portfolioImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease-in-out',
  },
  portfolioOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.4s ease-in-out',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '20px',
  },
  portfolioActions: {
    transform: 'translateY(20px)',
    transition: 'all 0.4s ease-in-out',
    display: 'flex',
    gap: '15px',
  },
  portfolioActionBtn: {
    width: '50px',
    height: '50px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d6ca14',
    fontSize: '22px',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  portfolioActionIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portfolioContent: {
    padding: '25px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  portfolioCategory: {
    fontSize: '14px',
    color: '#d6ca14',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
    display: 'block',
    marginBottom: '10px',
    fontFamily: '"Poppins", sans-serif',
  },
  portfolioTitle: {
    fontSize: '22px',
    margin: '0 0 15px',
    fontWeight: '700',
    color: '#333',
    fontFamily: '"Playfair Display", serif',
  },
  branchDetails: {
    marginBottom: '15px',
    flex: '1',
  },
  portfolioDescription: {
    fontSize: '15px',
    color: 'rgba(51, 51, 51, 0.8)',
    margin: '0 0 12px',
    lineHeight: '1.6',
    display: 'flex',
    alignItems: 'flex-start',
    fontFamily: '"Poppins", sans-serif',
  },
  icon: {
    marginRight: '10px',
    color: '#d6ca14',
    fontSize: '18px',
    minWidth: '20px',
  },
  amenities: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  amenity: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: 'rgba(51, 51, 51, 0.8)',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    padding: '5px 10px',
    borderRadius: '20px',
    fontFamily: '"Poppins", sans-serif',
  },
  orderNowButton: {
    backgroundColor: '#d6ca14',
    color: 'black',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px',
    transition: 'all 0.3s ease',
    width: '100%',
    boxShadow: '0 4px 10px rgba(255, 193, 7, 0.3)',
    fontFamily: '"Poppins", sans-serif',
    letterSpacing: '0.5px',
  },
  modalTitle: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: '"Playfair Display", serif',
  },
  modalSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
  },
  modalButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  foodAppButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90px',
    height: '90px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    padding: '15px',
  },
  foodAppLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  closeModalButton: {
    backgroundColor: '#fff',
    color: '#333',
    border: '2px solid #d6ca14',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px',
    width: '100%',
    transition: 'all 0.3s ease',
    fontFamily: '"Poppins", sans-serif',
  },
  lightboxOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9999',
    padding: '20px',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  lightboxImg: {
    maxWidth: '100%',
    maxHeight: '90vh',
    display: 'block',
    borderRadius: '12px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  lightboxClose: {
    position: 'absolute',
    top: '-50px',
    right: '0',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#e4141c',
    }
  }
};

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
    border: 'none',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  }
};

export default Branches;