import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const downloadBrochure = () => {
    alert('Downloading franchise brochure...');
  };

  return (
    <section className="section-padding" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <motion.h2 
          className="text-center" 
          style={{ marginBottom: '50px', color: '#333' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          What Our Franchisees Say
        </motion.h2>

        <motion.div 
          className="row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="col-md-6">
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '30px',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <p style={{ fontStyle: 'italic', fontSize: '18px', lineHeight: '1.6' }}>
                "The Banjos team made setup seamless. We got full training, branding help, and now see 200+ daily footfall."
              </p>
              <p style={{ fontWeight: '600', marginTop: '20px' }}>
                – Rohan Patil, Franchisee – Nashik
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '30px',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <p style={{ fontStyle: 'italic', fontSize: '18px', lineHeight: '1.6' }}>
                "Tasty, fresh, and a hit with students. We're opening our second outlet now."
              </p>
              <p style={{ fontWeight: '600', marginTop: '20px' }}>
                – Anita R., Franchisee – Pune
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center" 
          style={{ marginTop: '50px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.button
            onClick={downloadBrochure}
            style={{
              backgroundColor: '#d6ca14',
              color: '#333',
              padding: '15px 40px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📥 Download Franchise Brochure
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;