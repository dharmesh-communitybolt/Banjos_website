import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaStar, FaRegClock, FaUtensils, FaBirthdayCake, FaBriefcase, FaHeart } from 'react-icons/fa';

const WhyBanjosSection = () => {
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
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div style={{ fontFamily: '"Poppins", "Helvetica Neue", sans-serif', overflowX: 'hidden' }}>
      {/* Mission & Vision Section */}
      <section style={{
        background: `linear-gradient(105deg, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
        color: '#fff',
        padding: '100px 20px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '60px',
          alignItems: 'center'
        }}>
          <motion.div 
            style={{ flex: '1 1 500px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h1 
              style={{
                color: '#FFD700',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: '700',
                marginBottom: '30px',
                lineHeight: '1.2'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Our Mission & Vision
            </motion.h1>
            
            <motion.div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '16px', 
                padding: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{
                    width: '8px',
                    height: '40px',
                    background: '#FFD700',
                    borderRadius: '4px',
                    marginRight: '15px'
                  }}></div>
                  <h3 style={{
                    color: '#FFD700',
                    fontSize: '1.6rem',
                    fontWeight: '600'
                  }}>
                    Mission
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7', 
                  marginBottom: '30px',
                  paddingLeft: '23px'
                }}>
                  To become the world class organisation to serve quality food with 100% customer satisfaction through our franchisee network.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{
                    width: '8px',
                    height: '40px',
                    background: '#FFD700',
                    borderRadius: '4px',
                    marginRight: '15px'
                  }}></div>
                  <h3 style={{
                    color: '#FFD700',
                    fontSize: '1.6rem',
                    fontWeight: '600'
                  }}>
                    Vision
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7',
                  paddingLeft: '23px'
                }}>
                  To become a leading food chain in India known for quality, affordability, and innovation.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '15px', 
                marginTop: '40px' 
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { icon: <FaLeaf />, text: 'Quality Ingredients', color: '#4CAF50' },
                { icon: <FaStar />, text: 'Customer Satisfaction', color: '#FFD700' },
                { icon: <FaRegClock />, text: 'Innovation', color: '#2196F3' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '30px',
                    border: `1px solid ${item.color}30`,
                    fontSize: '0.95rem'
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    background: 'rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <span style={{ color: item.color, marginRight: '10px', fontSize: '1.1rem' }}>
                    {item.icon}
                  </span>
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ 
              flex: '1 1 400px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div style={{
              width: '100%',
              maxWidth: '450px',
              height: '450px',
              borderRadius: '20px',
              background: `url('https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(0,0,0,0.2), rgba(255,215,0,0.1))'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: '#fff'
              }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem' }}>Banjos Kitchen</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Where flavor meets innovation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      {/* Values Section */}
<section style={{ 
  background: '#f8f9fa',
  padding: '100px 20px',
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* SVG Background Pattern */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    zIndex: 0
  }}></div>
  
  {/* Floating dots decoration */}
  <div style={{
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '120px',
    height: '120px',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='10' fill='%23FFD700' fill-opacity='0.2' /%3E%3Ccircle cx='50' cy='50' r='15' fill='%23E91E63' fill-opacity='0.2' /%3E%3Ccircle cx='80' cy='80' r='8' fill='%232196F3' fill-opacity='0.2' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }}></div>
  
  <div style={{ 
    maxWidth: '1200px', 
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  }}>
    <motion.div 
  style={{ textAlign: 'center', marginBottom: '70px' }}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <div style={{
    display: 'inline-block',
    position: 'relative',
    paddingBottom: '20px' // Added padding to create space for the underline
  }}>
    <motion.h2 
      style={{ 
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', 
        fontWeight: '700',
        marginBottom: '0', // Removed bottom margin since we have padding on parent
        color: '#222',
        letterSpacing: '0.5px'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Our Core Values
    </motion.h2>
    <motion.div 
      style={{
        position: 'absolute',
        bottom: '0', // Positioned at the bottom of the parent container
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        background: '#FFD700',
        borderRadius: '2px'
      }}
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
    />
  </div>
  
  <motion.p 
    style={{ 
      maxWidth: '700px', 
      margin: '20px auto 0', // Added top margin to separate from the heading
      fontSize: '1.1rem', 
      lineHeight: '1.7',
      color: '#555'
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    viewport={{ once: true }}
  >
    At Banjos, we are committed to excellence in every aspect of our business, from ingredient sourcing to customer experience.
  </motion.p>
</motion.div>
    
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '40px'
    }}>
      {[
        { 
          title: 'Quality First', 
          desc: 'We source the finest ingredients and maintain rigorous quality standards in every dish we serve.',
          icon: <FaStar />,
          color: '#FFD700',
          svg: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 4L36.9 22.6L56.5 22.6L40.3 34.4L47.2 53L30 41.2L12.8 53L19.7 34.4L3.5 22.6L23.1 22.6L30 4Z' fill='%23FFD700' fill-opacity='0.1' /%3E%3C/svg%3E")`
        },
        { 
          title: 'Customer Focus', 
          desc: 'Our customers are at the heart of everything we do. Their satisfaction is our ultimate goal.',
          icon: <FaHeart />,
          color: '#E91E63',
          svg: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 54.5C30 54.5 5 39.5 5 20.5C5 13.5 10.5 8 17.5 8C23 8 28 11 30 15C32 11 37 8 42.5 8C49.5 8 55 13.5 55 20.5C55 39.5 30 54.5 30 54.5Z' fill='%23E91E63' fill-opacity='0.1' /%3E%3C/svg%3E")`
        },
        { 
          title: 'Innovation', 
          desc: 'We continuously evolve our menu and services to stay ahead of culinary trends and customer expectations.',
          icon: <FaRegClock />,
          color: '#2196F3',
          svg: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM30 50C19 50 10 41 10 30C10 19 19 10 30 10C41 10 50 19 50 30C50 41 41 50 30 50ZM32.5 17.5H27.5V32.5H40V27.5H32.5V17.5Z' fill='%232196F3' fill-opacity='0.1' /%3E%3C/svg%3E")`
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          style={{
            flex: '1 1 300px',
            maxWidth: '350px',
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.03)'
          }}
          initial={{ 
            opacity: 0, 
            y: 50
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0
          }}
          whileHover={{
            y: -10,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)'
          }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* SVG Background for each card */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            backgroundImage: item.svg,
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            zIndex: 0
          }}></div>
          
          {/* Icon container */}
          <motion.div 
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              margin: '0 auto 25px',
              background: `${item.color}15`,
              color: item.color,
              position: 'relative',
              zIndex: 2
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              background: `${item.color}20`
            }}
            transition={{ duration: 0.3 }}
          >
            {item.icon}
          </motion.div>
          
          {/* Content */}
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '15px',
            color: '#333',
            position: 'relative',
            zIndex: 2
          }}>
            {item.title}
          </h3>
          <p style={{ 
            color: '#666', 
            lineHeight: '1.7',
            margin: 0,
            position: 'relative',
            zIndex: 2
          }}>
            {item.desc}
          </p>
          
          {/* Animated underline */}
          <motion.div 
            style={{
              height: '3px',
              width: '60px',
              background: item.color,
              margin: '25px auto 0',
              borderRadius: '3px',
              position: 'relative',
              zIndex: 2
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          />
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default WhyBanjosSection;