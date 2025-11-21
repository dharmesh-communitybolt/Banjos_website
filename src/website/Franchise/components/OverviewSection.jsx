import React from 'react';
import { motion } from 'framer-motion';

const OverviewSection = () => {
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

  return (
    <section className="section-padding" style={{ 
      padding: '100px 0', 
      backgroundColor: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* SVG Background Elements */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.15,
          zIndex: 1
        }}
      >
        <pattern id="circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#d6ca14" />
        </pattern>
        <rect x="0" y="0" width="100" height="100" fill="url(#circles)" />
      </svg>

      {/* Top right decorative SVG */}
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          opacity: 0.1,
          zIndex: 1
        }}
      >
        <motion.path
          d="M100 20 C140 20, 180 60, 180 100 C180 140, 140 180, 100 180 C60 180, 20 140, 20 100 C20 60, 60 20, 100 20 Z"
          stroke="#d6ca14"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, rotate: 0 }}
          whileInView={{ pathLength: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Bottom left decorative SVG */}
      <svg 
        width="150" 
        height="150" 
        viewBox="0 0 150 150"
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          opacity: 0.1,
          zIndex: 1
        }}
      >
        <motion.path
          d="M20 20 L130 20 L130 130 L20 130 Z"
          stroke="#d6ca14"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, rotate: 0 }}
          whileInView={{ pathLength: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Diagonal lines SVG */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.03,
          zIndex: 1
        }}
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="10" y1="0" x2="100" y2="90" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="20" y1="0" x2="100" y2="80" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="30" y1="0" x2="100" y2="70" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="40" y1="0" x2="100" y2="60" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="0" y1="10" x2="90" y2="100" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="0" y1="20" x2="80" y2="100" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="0" y1="30" x2="70" y2="100" stroke="#d6ca14" strokeWidth="0.5" />
        <line x1="0" y1="40" x2="60" y2="100" stroke="#d6ca14" strokeWidth="0.5" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="row align-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="col-lg-6" variants={itemVariants}>
            <motion.h2 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '800', 
                marginBottom: '25px', 
                color: '#222'
              }}
              variants={itemVariants}
            >
              About Us
            </motion.h2>
            <motion.h3 
              style={{ 
                color: '#d6ca14', 
                marginBottom: '25px', 
                fontSize: '1.8rem',
                fontWeight: '700'
              }}
              variants={itemVariants}
            >
              Crafted with Passion. Built on Buns.
            </motion.h3>
            <motion.p 
              style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '25px',
                color: '#444'
              }}
              variants={itemVariants}
            >
              Founded in 2017 in Nashik, Banjos started with a simple mission: to make global-style, high-quality fast food accessible to Indian youth.
            </motion.p>
            <motion.p 
              style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '25px',
                color: '#444'
              }}
              variants={itemVariants}
            >
              From a single outlet to a rapidly growing network across Maharashtra and beyond, we serve burgers, pizzas, sandwiches, and more—all in a cozy, Instagram-worthy café format.
            </motion.p>
            <motion.p 
              style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                fontWeight: '700',
                color: '#d6ca14'
              }}
              variants={itemVariants}
            >
              For today's youth, Banjos is more than just fast food—it's a vibe.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="col-lg-6"
            variants={itemVariants}
            style={{ padding: '20px', position: 'relative' }}
          >
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1
              }}
            >
              <motion.rect
                x="5"
                y="5"
                width="90"
                height="90"
                rx="10"
                stroke="#d6ca14"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
            </svg>
            
            <motion.div 
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '450px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(0,0,0,0.03), rgba(214,202,20,0.05))',
                borderRadius: '16px'
              }}></div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vision Section */}
        <motion.div 
          className="row" 
          style={{ marginTop: '100px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="col-lg-8 mx-auto text-center"
            variants={itemVariants}
          >
            <motion.h2 
              style={{ 
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', 
                fontWeight: '800', 
                marginBottom: '40px', 
                color: '#222'
              }}
              variants={itemVariants}
            >
              Our Vision
            </motion.h2>
            <div className="row">
              <motion.div 
                className="col-md-4 mb-5"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 100 100"
                  style={{ marginBottom: '20px' }}
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="rgba(214, 202, 20, 0.1)"
                    stroke="#d6ca14"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <text 
                    x="50" 
                    y="58" 
                    textAnchor="middle" 
                    fill="#d6ca14" 
                    fontSize="40"
                    fontWeight="bold"
                  >
                    1
                  </text>
                </svg>
                <h4 style={{ 
                  fontWeight: '700', 
                  marginBottom: '15px',
                  color: '#333'
                }}>Driven by Flavor</h4>
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  Creating unforgettable taste experiences that keep customers coming back.
                </p>
              </motion.div>
              
              <motion.div 
                className="col-md-4 mb-5"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 100 100"
                  style={{ marginBottom: '20px' }}
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="rgba(214, 202, 20, 0.1)"
                    stroke="#d6ca14"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <text 
                    x="50" 
                    y="58" 
                    textAnchor="middle" 
                    fill="#d6ca14" 
                    fontSize="40"
                    fontWeight="bold"
                  >
                    2
                  </text>
                </svg>
                <h4 style={{ 
                  fontWeight: '700', 
                  marginBottom: '15px',
                  color: '#333'
                }}>Backed by Strong Systems</h4>
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  Efficient operations and support systems that ensure franchise success.
                </p>
              </motion.div>
              
              <motion.div 
                className="col-md-4 mb-5"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 100 100"
                  style={{ marginBottom: '20px' }}
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="rgba(214, 202, 20, 0.1)"
                    stroke="#d6ca14"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                  <text 
                    x="50" 
                    y="58" 
                    textAnchor="middle" 
                    fill="#d6ca14" 
                    fontSize="40"
                    fontWeight="bold"
                  >
                    3
                  </text>
                </svg>
                <h4 style={{ 
                  fontWeight: '700', 
                  marginBottom: '15px',
                  color: '#333'
                }}>Poised for National Growth</h4>
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  Expanding across India to become the nation's favorite food destination.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;