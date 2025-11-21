import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPaintRoller, FaUsers, FaBullhorn, FaGraduationCap, FaUtensils, FaTruck, FaCalendarAlt, FaSeedling, FaChartLine } from 'react-icons/fa';

const SupportSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)",
      transition: {
        duration: 0.3
      }
    }
  };

  const timelineDotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section style={{ 
      padding: '100px 20px', 
      backgroundColor: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-circle(#d6ca14 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
        opacity: 0.05,
        zIndex: 1
      }}></div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 2 
      }}>
        {/* Header */}
        <motion.h2 
          style={{ 
            textAlign: 'center', 
            marginBottom: '60px', 
            color: '#222',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '800'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Franchisee Support – End to End
        </motion.h2>

        {/* Support Phases */}
        <motion.div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Pre-Launch */}
          <motion.div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
              borderTop: '5px solid #4CAF50'
            }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                marginRight: '15px'
              }}>
                <FaMapMarkerAlt />
              </div>
              <h3 style={{ 
                color: '#4CAF50', 
                margin: 0,
                fontSize: '1.4rem'
              }}>
                Pre-Launch
              </h3>
            </div>
            
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              margin: 0
            }}>
              {[
                { icon: <FaMapMarkerAlt />, text: 'Site selection guidance' },
                { icon: <FaPaintRoller />, text: 'Layout & interiors planning' },
                { icon: <FaUsers />, text: 'Hiring support' },
                { icon: <FaBullhorn />, text: 'Pre-launch marketing' }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  style={{ 
                    padding: '12px 0', 
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  variants={itemVariants}
                >
                  <span style={{ 
                    color: '#4CAF50', 
                    marginRight: '10px',
                    fontSize: '0.9rem'
                  }}>
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Launch Phase */}
          <motion.div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
              borderTop: '5px solid #FF9800'
            }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#FF9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                marginRight: '15px'
              }}>
                <FaGraduationCap />
              </div>
              <h3 style={{ 
                color: '#FF9800', 
                margin: 0,
                fontSize: '1.4rem'
              }}>
                Launch Phase
              </h3>
            </div>
            
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              margin: 0
            }}>
              {[
                { icon: <FaGraduationCap />, text: 'Owner & staff training' },
                { icon: <FaUtensils />, text: 'Menu onboarding & POS setup' },
                { icon: <FaBullhorn />, text: 'Opening campaign' }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  style={{ 
                    padding: '12px 0', 
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  variants={itemVariants}
                >
                  <span style={{ 
                    color: '#FF9800', 
                    marginRight: '10px',
                    fontSize: '0.9rem'
                  }}>
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Post-Launch */}
          <motion.div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
              borderTop: '5px solid #2196F3'
            }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: '#2196F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                marginRight: '15px'
              }}>
                <FaTruck />
              </div>
              <h3 style={{ 
                color: '#2196F3', 
                margin: 0,
                fontSize: '1.4rem'
              }}>
                Post-Launch
              </h3>
            </div>
            
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0,
              margin: 0
            }}>
              {[
                { icon: <FaTruck />, text: 'Central supply chain support' },
                { icon: <FaCalendarAlt />, text: 'Ongoing marketing calendar' },
                { icon: <FaSeedling />, text: 'Seasonal menu innovation' },
                { icon: <FaChartLine />, text: 'Quality audits & performance dashboard' }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  style={{ 
                    padding: '12px 0', 
                    borderBottom: index < 3 ? '1px solid #f0f0f0' : 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  variants={itemVariants}
                >
                  <span style={{ 
                    color: '#2196F3', 
                    marginRight: '10px',
                    fontSize: '0.9rem'
                  }}>
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        {/* Timeline Section */}
<motion.div 
  style={{ marginTop: '80px' }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  <motion.h3 
    style={{ 
      textAlign: 'center', 
      marginBottom: '60px', 
      color: '#222',
      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
      fontWeight: '700'
    }}
    variants={itemVariants}
  >
    Franchise Setup Timeline
  </motion.h3>
  
  <div style={{ 
    position: 'relative', 
    padding: '60px 0 40px 0' // Increased top padding to create space
  }}>
    {/* Timeline line - moved higher */}
    <div style={{ 
      position: 'absolute', 
      top: '40px', // Changed from 50% to fixed position
      left: '0', 
      right: '0', 
      height: '3px', 
      backgroundColor: '#d6ca14',
      borderRadius: '2px'
    }}></div>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginTop: '20px' // Added margin to separate from the line
    }}>
      {[
        { week: 'Week 1-2', title: 'Intro call & site shortlisting' },
        { week: 'Week 3', title: 'Site approval & agreement' },
        { week: 'Week 4-6', title: 'Interiors, hiring, training' },
        { week: 'Week 7-8', title: 'Soft launch & grand opening' }
      ].map((item, index) => (
        <motion.div 
          key={index}
          style={{ 
            textAlign: 'center', 
            position: 'relative',
            zIndex: 2
          }}
          variants={itemVariants}
        >
          <motion.div 
            style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: '#d6ca14', 
              margin: '0 auto 15px',
              position: 'relative',
              boxShadow: '0 0 0 8px rgba(214, 202, 20, 0.2)'
            }}
            variants={timelineDotVariants}
            whileHover={{ scale: 1.2 }}
          ></motion.div>
          <p style={{ 
            fontWeight: '700', 
            marginBottom: '8px',
            color: '#333',
            fontSize: '1.1rem'
          }}>
            {item.week}
          </p>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            {item.title}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default SupportSection;