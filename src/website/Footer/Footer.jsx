import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColumnStyle = () => {
    if (windowWidth <= 768) {
      return { flex: '0 0 100%', maxWidth: '100%' };
    } else if (windowWidth <= 992) {
      return { flex: '0 0 50%', maxWidth: '50%' };
    } else {
      return { flex: '0 0 25%', maxWidth: '25%' };
    }
  };

  const styles = {
    footer: {
      backgroundColor: '#0c0b09',
      color: '#fff',
      padding: '60px 0 30px',
      fontFamily: '"Poppins", sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -15px',
    },
    footerCol: {
      padding: '0 15px',
      marginBottom: '30px',
      ...getColumnStyle(),
    },
    flexItem: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    icon: {
      fontSize: '20px',
      color: '#d6ca14',
      marginRight: '15px',
      marginTop: '4px',
    },
    footerHeading: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#fff',
      marginBottom: '15px',
      position: 'relative',
      paddingBottom: '10px',
      borderBottom: '2px solid #cda45e',
      display: 'inline-block',
    },
    footerText: {
      fontSize: '14px',
      lineHeight: '1.8',
      marginBottom: '0',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    strongText: {
      color: '#fff',
      fontWeight: '600',
    },
    socialLinks: {
      display: 'flex',
      marginTop: '15px',
      gap: '10px',
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      textDecoration: 'none',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.row}>
          {/* Address */}
          <div style={styles.footerCol}>
            <div style={styles.flexItem}>
              <FaMapMarkerAlt style={styles.icon} />
              <div>
                <h4 style={styles.footerHeading}>Address</h4>
                <p style={styles.footerText}>
                 Plot No 62, Lane No 4<br />
                 Pandit Colony, Nashik 422002
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div style={styles.footerCol}>
            <div style={styles.flexItem}>
              <FaPhoneAlt style={styles.icon} />
              <div>
                <h4 style={styles.footerHeading}>Contact</h4>
                <p style={styles.footerText}>
                  <span style={styles.strongText}>Phone:</span> +91 9112222066<br />
                  <span style={styles.strongText}>Email:</span>banjosthefoodchain@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div style={styles.footerCol}>
            <div style={styles.flexItem}>
              <FaClock style={styles.icon} />
              <div>
                <h4 style={styles.footerHeading}>Opening Hours</h4>
                <p style={styles.footerText}>
                  <span style={styles.strongText}>Mon-Sat:</span> 10AM - 10PM<br />
                  <span style={styles.strongText}>Sunday:</span> Closed
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div style={styles.footerCol}>
            <h4 style={styles.footerHeading}>Follow Us</h4>
            <div style={styles.socialLinks}>
              <a href="/" style={styles.socialLink}><FaTwitter /></a>
              <a href="/" style={styles.socialLink}><FaFacebook /></a>
              <a href="/" style={styles.socialLink}><FaInstagram /></a>
              <a href="/" style={styles.socialLink}><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
