import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faStore, faUtensils } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/img/whyus.jpg';

const WhyUs = () => {
  const reasons = [
    {
      id: 1,
      number: '01',
      title: 'Happy Customers',
      description: 'We have served millions of satisfied customers who love our delicious food and excellent service.',
      icon: faUsers,
    },
    {
      id: 2,
      number: '02',
      title: 'Franchises',
      description: 'Join our growing network of franchises and bring the taste of our restaurant to your community.',
      icon: faStore,
    },
    {
      id: 3,
      number: '03',
      title: 'Diverse Menu',
      description: 'Explore our wide range of dishes, from burgers and pizzas to sandwiches and beverages.',
      icon: faUtensils,
    },
  ];

  const [counters, setCounters] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
  });

  const [displayText, setDisplayText] = useState({
    counter1: '0',
    counter2: '0',
    counter3: '0',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        counter1: prev.counter1 < 1000000 ? prev.counter1 + 50000 : prev.counter1,
        counter2: prev.counter2 < 50 ? prev.counter2 + 1 : prev.counter2,
        counter3: prev.counter3 < 100 ? prev.counter3 + 5 : prev.counter3,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayText({
      counter1: counters.counter1 >= 1000000 ? '1 Million+' : `${counters.counter1.toLocaleString()}+`,
      counter2: `${counters.counter2}+`,
      counter3: `${counters.counter3}+`
    });
  }, [counters]);

  
  const styles = {
    whyUsSection: {
      backgroundImage: ` url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '80px 0',
      color: 'white',
      position: 'relative',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
      position: 'relative',
      zIndex: 2,
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '15px',
      color: '#fff',
    },
    descriptionTitle: {
      fontSize: '18px',
      color: '#f0e70c',
      display: 'block',
      marginBottom: '15px',
    },
    sectionTitleAfter: {
      content: '""',
      display: 'block',
      width: '50px',
      height: '3px',
      background: '#f0e70c',
      margin: '20px auto',
    },
    cardItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      padding: '30px',
      height: '100%',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      '&:hover': {
        transform: 'translateY(-10px)',
        background: 'rgba(255, 255, 255, 0.2)',
      },
    },
    icon: {
      fontSize: '48px',
      color: '#f0e70c',
      marginBottom: '20px',
    },
    counter: {
      display: 'block',
      fontSize: '36px',
      fontWeight: '700',
      color: '#f0e70c',
      marginBottom: '15px',
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#fff',
      textDecoration: 'none',
    },
    cardDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
  };

  return (
    <section id="why-us" style={styles.whyUsSection}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.sectionTitle} data-aos="fade-up">
          <h2 style={styles.title}>Why Us</h2>
          <div>
            <span style={styles.descriptionTitle}>Why choose Our Restaurant</span>
            <span style={styles.sectionTitleAfter}></span>
          </div>
        </div>

        <div className="row gy-4">
          {reasons.map((reason, index) => (
            <div className="col-lg-4" key={reason.id} data-aos="fade-up" data-aos-delay={reason.id * 100}>
              <div style={styles.cardItem}>
                <div style={styles.icon}>
                  <FontAwesomeIcon icon={reason.icon} />
                </div>
                <span style={styles.counter}>{displayText[`counter${index + 1}`]}</span>
                <h4><a href="" style={styles.cardTitle} className="stretched-link">{reason.title}</a></h4>
                <p style={styles.cardDescription}>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;