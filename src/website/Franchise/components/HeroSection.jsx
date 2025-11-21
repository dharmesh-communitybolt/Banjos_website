import React, { useState } from 'react';
import { motion } from 'framer-motion';
import franchiseHero from '../assets/img/franchise-hero.jpg';

const HeroSection = () => {
  const [isBrochureHovered, setIsBrochureHovered] = useState(false);
  
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
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

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const downloadBrochure = () => {
    // Simulate download
    alert('Downloading franchise brochure...');
  };

  return (
    <section 
      className="franchise-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${franchiseHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '80px 20px 20px', // Added top padding (80px) while keeping side and bottom padding
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(214, 202, 20, 0.3)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid rgba(214, 202, 20, 0.2)',
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="container"
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        style={{ 
          maxWidth: '900px', 
          position: 'relative',
          zIndex: 2,
          paddingTop: '40px' // Additional container padding for better spacing
        }}
      >
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ marginBottom: '30px' }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: '800',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #d6ca14, #f5eb6e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 5px 15px rgba(214, 202, 20, 0.2)',
              lineHeight: '1.2'
            }}
          >
            BANJOS – India's Next Iconic Food Chain
          </motion.h1>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.p
            style={{ 
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', 
              lineHeight: '1.6', 
              marginBottom: '20px',
              fontWeight: '300',
              letterSpacing: '0.5px'
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Where Taste Meets Trend
          </motion.p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.p
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
              lineHeight: '1.6', 
              marginBottom: '50px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto 50px'
            }}
          >
            Join our fast-growing franchise family & bring India's youth their new favorite hangout spot.
          </motion.p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={downloadBrochure}
            onHoverStart={() => setIsBrochureHovered(true)}
            onHoverEnd={() => setIsBrochureHovered(false)}
            style={{
              background: 'linear-gradient(45deg, #d6ca14, #f5eb6e)',
              color: '#1a1a1a',
              padding: '18px 45px',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(214, 202, 20, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 25px rgba(214, 202, 20, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ x: isBrochureHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              📥 Download Franchise Brochure
            </motion.span>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                transform: 'translateX(-100%)',
              }}
              animate={{ transform: isBrochureHovered ? 'translateX(100%)' : 'translateX(-100%)' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          style={{ marginTop: '60px' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 5V19M12 19L19 12M12 19L5 12" 
                stroke="#d6ca14" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;