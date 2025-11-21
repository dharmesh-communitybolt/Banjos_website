import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/img/whyus.jpg';
import { BASE_URL } from '../../config'; 
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BASE_URL}/testimonial/`);
        if (!response.ok) throw new Error("Failed to fetch testimonials");

        const data = await response.json();
        const approvedTestimonials = data.filter(
          (testimonial) => testimonial.status === "approved"
        );
        setTestimonials(approvedTestimonials);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div style={{
        position: 'relative',
        padding: '3rem 0',
        fontFamily: "'Poppins', sans-serif",
        textAlign: 'center',
        color: 'white'
      }}>
        Loading testimonials...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'relative',
        padding: '3rem 0',
        fontFamily: "'Poppins', sans-serif",
        textAlign: 'center',
        color: 'white'
      }}>
        Error: {error}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div style={{
        position: 'relative',
        padding: '3rem 0',
        fontFamily: "'Poppins', sans-serif",
        textAlign: 'center',
        color: 'white'
      }}>
        No approved testimonials yet
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      padding: '3rem 0',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: ` url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(0.9)',
        zIndex: -1
      }}></div>

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: -1
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>What Our Clients Say</h2>
          <div style={{
            width: '5rem',
            height: '0.25rem',
            backgroundColor: '#f0e70c',
            margin: '0 auto'
          }}></div>
        </div>

        {/* Testimonial Card */}
        <div style={{
          maxWidth: '56rem',
          margin: '0 auto',
          position: 'relative'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={currentTestimonial}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
              position: 'relative'
            }}
          >
            {/* Profile Image */}
            <div style={{
              position: 'absolute',
              top: '-2rem',
              left: '2rem'
            }}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '6rem',
                  height: '6rem',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  border: '4px solid #ffffff',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                {testimonials[currentTestimonial]?.image && (
                  <img 
                    src={`${BASE_URL}${testimonials[currentTestimonial].image}`}
                    alt={testimonials[currentTestimonial].name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'path/to/default/image.jpg';
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Testimonial Content */}
            <div style={{ paddingTop: '2.5rem' }}>
              <FaQuoteLeft style={{
                color: '#d6ca14',
                fontSize: '2rem',
                marginBottom: '1.5rem'
              }} />
              <p style={{
                color: '#4a5568',
                fontSize: '1.125rem',
                fontStyle: 'italic',
                marginBottom: '2rem',
                lineHeight: '1.75'
              }}>
                {testimonials[currentTestimonial]?.description || 'No testimonial content'}
              </p>
              <div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#2d3748'
                }}>
                  {testimonials[currentTestimonial]?.name || 'Anonymous'}
                </h4>
                {/* Rating Stars */}
                {testimonials[currentTestimonial]?.rating && (
                  <div style={{ margin: '0.5rem 0', color: '#d6ca14' }}>
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dot Indicators */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              display: 'flex',
              gap: '0.5rem'
            }}>
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: index === currentTestimonial ? '#d6ca14' : '#e2e8f0',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background-color 0.2s ease-in-out'
                  }}
                ></motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem'
          }}>
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d6ca14',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease-in-out'
              }}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d6ca14',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease-in-out'
              }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;