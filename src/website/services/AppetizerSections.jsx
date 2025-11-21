import React, { useEffect } from 'react';
import { FaBirthdayCake, FaUtensils, FaBriefcase, FaHeart, FaLeaf, FaStar, FaRegClock } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AppetizerSections = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.8,
        repeat: 1,
        repeatType: "reverse"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  // Enhanced service card variants
  const serviceCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.2
      }
    }
  };

  const iconWrapperVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: {
      rotate: 10,
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2
      }
    }
  };

  return (
    <div className="appetizer-container">
      {/* Hero Section */}
      <section className="appetizer-hero-section" ref={ref}>
  <div className="appetizer-inner-container">
    <motion.div
      className="appetizer-row"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="appetizer-text-col" variants={itemVariants}>
        <motion.h1
          style={{
            color: 'rgb(240, 231, 12)',
            textAlign: 'center',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '2.5rem',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            margin: '20px 0',
            padding: '10px',
            letterSpacing: '1px'
          }}
          whileHover={{ scale: 1.02 }}
        >
          Our Mission & Vision
        </motion.h1>
       
        <motion.div variants={itemVariants}>
          <h3 style={{
            color: 'rgb(240, 231, 12)',
            fontSize: '1.5rem',
            margin: '15px 0 10px',
            fontWeight: '600'
          }}>
            Mission
          </h3>
          <p>
            To become the world class organisation to serve quality food with 100% customer satisfaction through our franchisee network.
          </p>
         
          <h3 style={{
            color: 'rgb(240, 231, 12)',
            fontSize: '1.5rem',
            margin: '15px 0 10px',
            fontWeight: '600'
          }}>
            Vision
          </h3>
          <p>
            To become a leading food chain in India known for quality, affordability, and innovation.
          </p>
        </motion.div>
       
        <motion.div className="appetizer-badges" variants={itemVariants}>
          <motion.span whileHover={{ scale: 1.05 }}>
            <FaLeaf className="appetizer-icon appetizer-green" /> Quality Ingredients
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }}>
            <FaStar className="appetizer-icon appetizer-gold" /> Customer Satisfaction
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }}>
            <FaRegClock className="appetizer-icon appetizer-blue" /> Innovation
          </motion.span>
        </motion.div>
      </motion.div>
     
      <motion.div
        className="appetizer-image-col"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }
        }}
      >
        <motion.div
          className="appetizer-video-box"
          variants={pulseVariants}
          initial="initial"
          animate="pulse"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <GiMeal size={80} className="appetizer-meal-icon" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>
 

      {/* Intro Section */}
      <section className="appetizer-intro-section">
        <div className="appetizer-inner-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Culinary Philosophy
          </motion.h2>
          <motion.p 
            className="appetizer-lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At Appetizer, we believe in creating memorable dining experiences. Our dishes are inspired by global flavors while staying true to local traditions.
          </motion.p>
          <div className="appetizer-features">
            <motion.div 
              className="appetizer-feature"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className="appetizer-icon-circle appetizer-bg-primary"><FaLeaf /></div>
              <span>Farm-to-Table</span>
            </motion.div>
            <motion.div 
              className="appetizer-feature"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="appetizer-icon-circle appetizer-bg-danger"><FaUtensils /></div>
              <span>Seasonal Menus</span>
            </motion.div>
            <motion.div 
              className="appetizer-feature"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="appetizer-icon-circle appetizer-bg-warning"><FaStar /></div>
              <span>Chef's Specials</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="appetizer-services-section">
        <div className="appetizer-inner-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="appetizer-subtext"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We offer a variety of dining experiences to suit every occasion, from intimate dinners to grand celebrations.
          </motion.p>
          
          <motion.div 
            className="appetizer-service-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div 
              className="appetizer-service-card"
              variants={serviceCardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="appetizer-icon-wrapper appetizer-text-danger"
                variants={iconWrapperVariants}
              >
                <FaUtensils />
              </motion.div>
              <motion.h5 variants={textVariants}>Catering Services</motion.h5>
              <motion.p variants={textVariants}>
                Professional catering for corporate events, private parties, and special occasions with customizable menus.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="appetizer-service-card"
              variants={serviceCardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="appetizer-icon-wrapper appetizer-text-primary"
                variants={iconWrapperVariants}
              >
                <FaBirthdayCake />
              </motion.div>
              <motion.h5 variants={textVariants}>Birthday Parties</motion.h5>
              <motion.p variants={textVariants}>
                Celebrate your special day with our themed party packages and customized birthday cakes.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="appetizer-service-card"
              variants={serviceCardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="appetizer-icon-wrapper appetizer-text-success"
                variants={iconWrapperVariants}
              >
                <FaBriefcase />
              </motion.div>
              <motion.h5 variants={textVariants}>Business Meetings</motion.h5>
              <motion.p variants={textVariants}>
                Private dining rooms and business lunch specials designed for productive meetings.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="appetizer-service-card"
              variants={serviceCardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="appetizer-icon-wrapper appetizer-text-warning"
                variants={iconWrapperVariants}
              >
                <FaHeart />
              </motion.div>
              <motion.h5 variants={textVariants}>Wedding Receptions</motion.h5>
              <motion.p variants={textVariants}>
                Elegant wedding packages with menu tastings, decor coordination, and professional staff.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scoped CSS */}
      <style jsx>{`
        .appetizer-container {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          overflow-x: hidden;
          color: #333;
        }

        .appetizer-inner-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .appetizer-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                      url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4') center/cover no-repeat;
          color: #fff;
          padding: 5rem 1rem;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .appetizer-row {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
        }

        .appetizer-text-col {
          flex: 1;
          min-width: 300px;
        }

        .appetizer-text-col h1 {
          font-size: 2.5rem;
          font-weight: bold;
        }

        .appetizer-text-col p {
          font-size: 1.1rem;
          margin: 1rem 0;
          line-height: 1.6;
        }

        .appetizer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .appetizer-badges span {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          backdrop-filter: blur(5px);
          font-size: 0.9rem;
          cursor: default;
        }

        .appetizer-icon {
          margin-right: 0.5rem;
        }

        .appetizer-green { color: #4CAF50; }
        .appetizer-gold { color: #FFD700; }
        .appetizer-blue { color: #1E90FF; }

        .appetizer-image-col {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 300px;
        }

        .appetizer-video-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 50%;
          backdrop-filter: blur(5px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }

        .appetizer-meal-icon {
          opacity: 0.9;
          color: #f0e70c;
        }

        .appetizer-intro-section {
          text-align: center;
          padding: 4rem 1rem;
          background: #fff;
        }

        .appetizer-intro-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #222;
        }

        .appetizer-lead {
          max-width: 700px;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
        }

        .appetizer-features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 2rem;
        }

        .appetizer-feature {
          text-align: center;
          min-width: 150px;
          cursor: default;
        }

        .appetizer-feature span {
          display: block;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .appetizer-icon-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 0.5rem;
          font-size: 1.5rem;
        }

        .appetizer-bg-primary { background: #0d6efd; }
        .appetizer-bg-danger { background: #dc3545; }
        .appetizer-bg-warning { background: #f0e70c; }

        .appetizer-services-section {
          background: #f9f9f9;
          padding: 4rem 1rem;
          text-align: center;
        }

        .appetizer-services-section h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #222;
        }

        .appetizer-subtext {
          max-width: 600px;
          margin: 0 auto 2rem;
          color: #6c757d;
          line-height: 1.6;
        }

        .appetizer-service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .appetizer-service-card {
          background: #fff;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          cursor: default;
          will-change: transform;
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          position: relative;
        }

        .appetizer-service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #f0e70c, #dc3545);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .appetizer-service-card:hover::before {
          transform: scaleX(1);
        }

        .appetizer-service-card h5 {
          margin: 1rem 0;
          color: #333;
          font-size: 1.2rem;
        }

        .appetizer-service-card p {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .appetizer-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1rem;
          will-change: transform;
        }

        .appetizer-text-danger { background: #fdecea; color: #dc3545; }
        .appetizer-text-primary { background: #e7f1ff; color: #0d6efd; }
        .appetizer-text-success { background: #e9f7ef; color: #198754; }
        .appetizer-text-warning { background: #fff3cd; color: #ffc107; }

        @media (max-width: 768px) {
          .appetizer-row {
            flex-direction: column;
          }

          .appetizer-hero-section {
            padding: 3rem 1rem;
            min-height: auto;
          }

          .appetizer-hero-section h1 {
            font-size: 2rem;
          }

          .appetizer-service-grid {
            grid-template-columns: 1fr;
          }

          .appetizer-features {
            flex-direction: column;
            align-items: center;
          }

          .appetizer-video-box {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AppetizerSections;