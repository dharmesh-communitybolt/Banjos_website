// import React, { useState } from 'react';
// import Select from 'react-select';
// import { Country, State, City } from 'country-state-city';
// import { motion } from 'framer-motion';
// import reservation from '../assets/img/reservation.jpg';
// import { BASE_URL } from '../config';

// const Franchise = () => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     user_email: '',
//     user_phone: '',
//     requested_country: null,
//     requested_state: null,
//     requested_city: null,
//     investment_budget: '',
//     experience_in_food_business: '',
//     additional_details: '',
//     request_status: 'pending',
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const bannerVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: 'easeOut' },
//     },
//   };

//   const formVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { delay: 0.3, duration: 0.8 },
//     },
//   };

//   const countryOptions = Country.getAllCountries().map((country) => ({
//     value: country.isoCode,
//     label: country.name,
//   }));

//   const stateOptions = formData.requested_country
//     ? State.getStatesOfCountry(formData.requested_country).map((state) => ({
//         value: state.isoCode,
//         label: state.name,
//       }))
//     : [];

//   const cityOptions =
//     formData.requested_country && formData.requested_state
//       ? City.getCitiesOfState(
//           formData.requested_country,
//           formData.requested_state
//         ).map((city) => ({
//           value: city.name,
//           label: city.name,
//         }))
//       : [];

//   const handleCountryChange = (selectedOption) => {
//     setFormData({
//       ...formData,
//       requested_country: selectedOption.value,
//       requested_state: null,
//       requested_city: null,
//     });
//   };

//   const handleStateChange = (selectedOption) => {
//     setFormData({
//       ...formData,
//       requested_state: selectedOption.value,
//       requested_city: null,
//     });
//   };

//   const handleCityChange = (selectedOption) => {
//     setFormData({
//       ...formData,
//       requested_city: selectedOption.value,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSubmitted(false);

//     const payload = {
//       ...formData,
//     };

//     try {
//       const response = await fetch(`${BASE_URL}/franchise/requests/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error('Failed to submit request');

//       setFormData({
//         user_name: '',
//         user_email: '',
//         user_phone: '',
//         requested_country: null,
//         requested_state: null,
//         requested_city: null,
//         investment_budget: '',
//         experience_in_food_business: '',
//         additional_details: '',
//         request_status: 'pending',
//       });

//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (err) {
//       setError('Failed to submit request. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const styles = {
//     franchiseBanner: {
//       backgroundImage:
//         'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       height: '580px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       textAlign: 'center',
//       padding: '20px',
//       marginBottom: '50px',
//     },
//     reservationImg: {
//       backgroundImage: `url(${reservation})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       minHeight: '300px',
//     },
//     /*
//     reservationImg: {
//   backgroundImage: `url(${reservation})`,
//   backgroundSize: 'contain',     
//   backgroundRepeat: 'no-repeat', 
//   backgroundPosition: 'center',
//   minHeight: '300px',
// },*/
//     reservationFormBg: {
//       backgroundColor: '#fff',
//       padding: '40px',
//       boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
//     },
//     formControl: {
//       width: '100%',
//       padding: '10px 15px',
//       borderRadius: '4px',
//       border: '1px solid #ddd',
//       marginBottom: '15px',
//     },
//     submitButton: {
//       backgroundColor: '#d6ca14',
//       color: '#333',
//       padding: '12px 30px',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '16px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//     },
//   };

//   return (
//     <>
//       <motion.section
//         className="franchise-banner"
//         initial="hidden"
//         animate="visible"
//         variants={bannerVariants}
//         style={styles.franchiseBanner}
//       >
//         <div style={{ maxWidth: '800px', marginTop: '90px' }}>
//           <motion.h1
//             style={{
//               fontSize: '48px',
//               fontWeight: '700',
//               marginBottom: '20px',
//               color: '#d6ca14',
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Own a Banjo&apos;s Franchise
//           </motion.h1>
//           <motion.p
//             style={{ fontSize: '20px', lineHeight: '1.6' }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             Join our growing family of franchise owners and bring the Banjo&apos;s experience to your community
//           </motion.p>
//         </div>
//       </motion.section>

//       <section style={{ padding: '60px 0' }}>
//         <motion.div
//           className="container text-center"
//           initial="hidden"
//           animate="visible"
//           variants={formVariants}
//         >
//           <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>Franchise Inquiry</h2>
//           <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
//             Fill out the form below to inquire about franchise opportunities
//           </p>
//         </motion.div>

//         <div className="container">
//           <motion.div
//             className="row"
//             initial="hidden"
//             animate="visible"
//             variants={formVariants}
//           >
//             <div className="col-lg-6" style={styles.reservationImg}></div>

//             <div className="col-lg-6" style={styles.reservationFormBg}>
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       name="user_name"
//                       style={styles.formControl}
//                       placeholder="Your Name"
//                       value={formData.user_name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="email"
//                       name="user_email"
//                       style={styles.formControl}
//                       placeholder="Your Email"
//                       value={formData.user_email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       name="user_phone"
//                       style={styles.formControl}
//                       placeholder="Your Phone"
//                       value={formData.user_phone}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <Select
//                       options={countryOptions}
//                       value={countryOptions.find((c) => c.value === formData.requested_country)}
//                       onChange={handleCountryChange}
//                       placeholder="Select Country"
//                       styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <Select
//                       options={stateOptions}
//                       value={stateOptions.find((s) => s.value === formData.requested_state)}
//                       onChange={handleStateChange}
//                       placeholder="Select State"
//                       isDisabled={!formData.requested_country}
//                       styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <Select
//                       options={cityOptions}
//                       value={cityOptions.find((c) => c.value === formData.requested_city)}
//                       onChange={handleCityChange}
//                       placeholder="Select City"
//                       isDisabled={!formData.requested_state}
//                       styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
//                     />
//                   </div>
//                   <div className="col-md-12">
//                     <input
//                       type="number"
//                       name="investment_budget"
//                       style={styles.formControl}
//                       placeholder="Investment Budget"
//                       value={formData.investment_budget}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-12">
//                     <textarea
//                       name="experience_in_food_business"
//                       style={{ ...styles.formControl, minHeight: '100px' }}
//                       placeholder="Experience in Food Business"
//                       value={formData.experience_in_food_business}
//                       onChange={handleInputChange}
//                     ></textarea>
//                   </div>
//                   <div className="col-md-12">
//                     <textarea
//                       name="additional_details"
//                       style={{ ...styles.formControl, minHeight: '100px' }}
//                       placeholder="Additional Details"
//                       value={formData.additional_details}
//                       onChange={handleInputChange}
//                     ></textarea>
//                   </div>
//                 </div>

//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 {submitted && <p style={{ color: 'green' }}>Request submitted successfully!</p>}

//                 <button
//                   type="submit"
//                   style={{
//                     ...styles.submitButton,
//                     ...(loading && { opacity: 0.6, cursor: 'not-allowed' }),
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? 'Submitting...' : 'Submit Request'}
//                 </button>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Franchise;


import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { motion } from 'framer-motion';
import reservation from '../assets/img/reservation.jpg';
import { BASE_URL } from '../config';

const Franchise = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    requested_country: null,
    requested_state: null,
    requested_city: null,
    investment_budget: '',
    experience_in_food_business: '',
    additional_details: '',
    request_status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const bannerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = formData.requested_country
    ? State.getStatesOfCountry(formData.requested_country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions =
    formData.requested_country && formData.requested_state
      ? City.getCitiesOfState(
          formData.requested_country,
          formData.requested_state
        ).map((city) => ({
          value: city.name,
          label: city.name,
        }))
      : [];

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_country: selectedOption.value,
      requested_state: null,
      requested_city: null,
    });
  };

  const handleStateChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_state: selectedOption.value,
      requested_city: null,
    });
  };

  const handleCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_city: selectedOption.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    const payload = {
      ...formData,
    };

    try {
      const response = await fetch(`${BASE_URL}/franchise/requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        requested_country: null,
        requested_state: null,
        requested_city: null,
        investment_budget: '',
        experience_in_food_business: '',
        additional_details: '',
        request_status: 'pending',
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadBrochure = () => {
    // This would typically link to a PDF file
    alert('Downloading franchise brochure...');
  };

  const styles = {
    franchiseBanner: {
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '580px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      marginBottom: '50px',
    },
    reservationImg: {
      backgroundImage: `url(${reservation})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',
    },
    reservationFormBg: {
      backgroundColor: '#fff',
      padding: '40px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
    },
    formControl: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '15px',
    },
    submitButton: {
      backgroundColor: '#d6ca14',
      color: '#333',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    section: {
      padding: '80px 0',
    },
    featureIcon: {
      fontSize: '40px',
      color: '#d6ca14',
      marginBottom: '20px',
    },
    tabButton: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '3px solid transparent',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginRight: '20px',
    },
    activeTab: {
      borderBottom: '3px solid #d6ca14',
      color: '#d6ca14',
    },
    testimonialCard: {
      backgroundColor: '#f9f9f9',
      padding: '30px',
      borderRadius: '8px',
      margin: '20px 0',
    },
  };

  return (
    <>
      {/* Hero Banner */}
      <motion.section
        className="franchise-banner"
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        style={styles.franchiseBanner}
      >
        <div style={{ maxWidth: '800px', marginTop: '90px' }}>
          <motion.h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#d6ca14',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            BANJOS – India's Next Iconic Food Chain
          </motion.h1>
          <motion.p
            style={{ fontSize: '24px', lineHeight: '1.6', marginBottom: '30px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Where Taste Meets Trend
          </motion.p>
          <motion.p
            style={{ fontSize: '20px', lineHeight: '1.6', marginBottom: '40px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Join our fast-growing franchise family & bring India's youth their new favorite hangout spot.
          </motion.p>
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
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              style={{ ...styles.tabButton, ...(activeTab === 'overview' && styles.activeTab) }}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              style={{ ...styles.tabButton, ...(activeTab === 'why' && styles.activeTab) }}
              onClick={() => setActiveTab('why')}
            >
              Why Banjos
            </button>
            <button 
              style={{ ...styles.tabButton, ...(activeTab === 'support' && styles.activeTab) }}
              onClick={() => setActiveTab('support')}
            >
              Support
            </button>
            <button 
              style={{ ...styles.tabButton, ...(activeTab === 'testimonials' && styles.activeTab) }}
              onClick={() => setActiveTab('testimonials')}
            >
              Testimonials
            </button>
            <button 
              style={{ ...styles.tabButton, ...(activeTab === 'apply' && styles.activeTab) }}
              onClick={() => setActiveTab('apply')}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      {(activeTab === 'overview' || activeTab === 'all') && (
        <motion.section 
          style={styles.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', color: '#333' }}>
                  About Us
                </h2>
                <h3 style={{ color: '#d6ca14', marginBottom: '20px' }}>Crafted with Passion. Built on Buns.</h3>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                  Founded in 2017 in Nashik, Banjos started with a simple mission: to make global-style, high-quality fast food accessible to Indian youth.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                  From a single outlet to a rapidly growing network across Maharashtra and beyond, we serve burgers, pizzas, sandwiches, and more—all in a cozy, Instagram-worthy café format.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8', fontWeight: '600' }}>
                  For today's youth, Banjos is more than just fast food—it's a vibe.
                </p>
              </div>
              <div className="col-lg-6">
                <div style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  borderRadius: '10px'
                }}></div>
              </div>
            </div>

            {/* Vision Section */}
            <div className="row" style={{ marginTop: '80px' }}>
              <div className="col-lg-8 mx-auto text-center">
                <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '30px', color: '#333' }}>
                  Our Vision
                </h2>
                <div className="row">
                  <div className="col-md-4">
                    <div style={styles.featureIcon}>●</div>
                    <h4>Driven by Flavor</h4>
                  </div>
                  <div className="col-md-4">
                    <div style={styles.featureIcon}>●</div>
                    <h4>Backed by Strong Systems</h4>
                  </div>
                  <div className="col-md-4">
                    <div style={styles.featureIcon}>●</div>
                    <h4>Poised for National Growth</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Why Banjos Section */}
      {(activeTab === 'why' || activeTab === 'all') && (
        <motion.section 
          style={{ ...styles.section, backgroundColor: '#f8f9fa' }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container">
            <div className="text-center" style={{ marginBottom: '50px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#333' }}>
                Why Everyone Loves Banjos
              </h2>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-2">
                    <span style={{ fontSize: '24px', color: '#d6ca14' }}>🔥</span>
                  </div>
                  <div className="col-10">
                    <h4>Bold, Distinct Flavors</h4>
                    <p>Melty burgers, cheesy pizzas, and crave-worthy bites.</p>
                  </div>
                </div>

                <div className="row" style={{ marginTop: '30px' }}>
                  <div className="col-2">
                    <span style={{ fontSize: '24px', color: '#d6ca14' }}>🥗</span>
                  </div>
                  <div className="col-10">
                    <h4>Freshly Made, Always Hot</h4>
                    <p>No pre-prep, only fresh & consistent quality.</p>
                  </div>
                </div>

                <div className="row" style={{ marginTop: '30px' }}>
                  <div className="col-2">
                    <span style={{ fontSize: '24px', color: '#d6ca14' }}>🎶</span>
                  </div>
                  <div className="col-10">
                    <h4>Youthful Ambience</h4>
                    <p>Trendy interiors, upbeat vibes, Insta-ready plating.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-2">
                    <span style={{ fontSize: '24px', color: '#d6ca14' }}>⚡</span>
                  </div>
                  <div className="col-10">
                    <h4>Fast Service, Zero Compromise</h4>
                    <p>Perfect for dine-in, takeaway, or delivery.</p>
                  </div>
                </div>

                <div className="row" style={{ marginTop: '30px' }}>
                  <div className="col-2">
                    <span style={{ fontSize: '24px', color: '#d6ca14' }}>💸</span>
                  </div>
                  <div className="col-10">
                    <h4>Affordable Indulgence</h4>
                    <p>Premium taste at pocket-friendly prices.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand USPs */}
            <div style={{ marginTop: '80px' }}>
              <h3 className="text-center" style={{ marginBottom: '40px', color: '#333' }}>
                Brand USPs – What Sets Banjos Apart
              </h3>
              <div className="row">
                <div className="col-md-4 text-center" style={{ marginBottom: '30px' }}>
                  <div style={{ ...styles.featureIcon, fontSize: '30px' }}>✅</div>
                  <p>Signature bun-based menu</p>
                </div>
                <div className="col-md-4 text-center" style={{ marginBottom: '30px' }}>
                  <div style={{ ...styles.featureIcon, fontSize: '30px' }}>✅</div>
                  <p>Compact & trendy café format</p>
                </div>
                <div className="col-md-4 text-center" style={{ marginBottom: '30px' }}>
                  <div style={{ ...styles.featureIcon, fontSize: '30px' }}>✅</div>
                  <p>Centralized sourcing for consistency</p>
                </div>
                <div className="col-md-4 text-center" style={{ marginBottom: '30px' }}>
                  <div style={{ ...styles.featureIcon, fontSize: '30px' }}>✅</div>
                  <p>Fast-turnaround products (delivery friendly)</p>
                </div>
                <div className="col-md-4 text-center" style={{ marginBottom: '30px' }}>
                  <div style={{ ...styles.featureIcon, fontSize: '30px' }}>✅</div>
                  <p>Affordable pricing with a premium feel</p>
                </div>
              </div>
            </div>

            {/* Why Partner */}
            <div style={{ marginTop: '80px' }}>
              <h3 className="text-center" style={{ marginBottom: '40px', color: '#333' }}>
                Why Partner with Banjos?
              </h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-2">
                      <span style={{ fontSize: '24px', color: '#d6ca14' }}>💰</span>
                    </div>
                    <div className="col-10">
                      <h4>Low Investment, High Potential</h4>
                      <p>Start with ₹10–20 lakhs & scale with ease.</p>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: '30px' }}>
                    <div className="col-2">
                      <span style={{ fontSize: '24px', color: '#d6ca14' }}>📘</span>
                    </div>
                    <div className="col-10">
                      <h4>Proven Playbook</h4>
                      <p>Operations, training, supply chain, & menu systems ready-to-run.</p>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: '30px' }}>
                    <div className="col-2">
                      <span style={{ fontSize: '24px', color: '#d6ca14' }}>📈</span>
                    </div>
                    <div className="col-10">
                      <h4>High Margins, Fast ROI</h4>
                      <p>30%+ ROI with breakeven in just 2–3 years.</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-2">
                      <span style={{ fontSize: '24px', color: '#d6ca14' }}>👩‍🎓</span>
                    </div>
                    <div className="col-10">
                      <h4>Youth-Loved Brand</h4>
                      <p>A café-style fast food model built for India's youth.</p>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: '30px' }}>
                    <div className="col-2">
                      <span style={{ fontSize: '24px', color: '#d6ca14' }}>🌍</span>
                    </div>
                    <div className="col-10">
                      <h4>Strategic Expansion Model</h4>
                      <p>City rights & territory exclusivity available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Support Section */}
      {(activeTab === 'support' || activeTab === 'all') && (
        <motion.section 
          style={styles.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container">
            <h2 className="text-center" style={{ marginBottom: '50px', color: '#333' }}>
              Franchisee Support – End to End
            </h2>

            <div className="row">
              <div className="col-md-4">
                <h3 className="text-center" style={{ color: '#d6ca14', marginBottom: '30px' }}>Pre-Launch</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Site selection guidance</li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Layout & interiors planning</li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Hiring support</li>
                  <li style={{ padding: '10px 0' }}>● Pre-launch marketing</li>
                </ul>
              </div>

              <div className="col-md-4">
                <h3 className="text-center" style={{ color: '#d6ca14', marginBottom: '30px' }}>Launch Phase</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Owner & staff training</li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Menu onboarding & POS setup</li>
                  <li style={{ padding: '10px 0' }}>● Opening campaign</li>
                </ul>
              </div>

              <div className="col-md-4">
                <h3 className="text-center" style={{ color: '#d6ca14', marginBottom: '30px' }}>Post-Launch</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Central supply chain support</li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Ongoing marketing calendar</li>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>● Seasonal menu innovation</li>
                  <li style={{ padding: '10px 0' }}>● Quality audits & performance dashboard</li>
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: '80px' }}>
              <h3 className="text-center" style={{ marginBottom: '40px', color: '#333' }}>
                Franchise Setup Timeline
              </h3>
              <div style={{ position: 'relative', padding: '20px 0' }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '0', 
                  right: '0', 
                  height: '2px', 
                  backgroundColor: '#d6ca14',
                  transform: 'translateY(-50%)' 
                }}></div>
                
                <div className="row">
                  <div className="col-md-3 text-center" style={{ position: 'relative' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: '#d6ca14', 
                      margin: '0 auto 10px',
                      position: 'relative',
                      zIndex: '1'
                    }}></div>
                    <p style={{ fontWeight: '600' }}>Week 1-2</p>
                    <p>Intro call & site shortlisting</p>
                  </div>
                  
                  <div className="col-md-3 text-center" style={{ position: 'relative' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: '#d6ca14', 
                      margin: '0 auto 10px',
                      position: 'relative',
                      zIndex: '1'
                    }}></div>
                    <p style={{ fontWeight: '600' }}>Week 3</p>
                    <p>Site approval & agreement</p>
                  </div>
                  
                  <div className="col-md-3 text-center" style={{ position: 'relative' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: '#d6ca14', 
                      margin: '0 auto 10px',
                      position: 'relative',
                      zIndex: '1'
                    }}></div>
                    <p style={{ fontWeight: '600' }}>Week 4-6</p>
                    <p>Interiors, hiring, training</p>
                  </div>
                  
                  <div className="col-md-3 text-center" style={{ position: 'relative' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: '#d6ca14', 
                      margin: '0 auto 10px',
                      position: 'relative',
                      zIndex: '1'
                    }}></div>
                    <p style={{ fontWeight: '600' }}>Week 7-8</p>
                    <p>Soft launch & grand opening</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Testimonials Section */}
      {(activeTab === 'testimonials' || activeTab === 'all') && (
        <motion.section 
          style={{ ...styles.section, backgroundColor: '#f8f9fa' }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container">
            <h2 className="text-center" style={{ marginBottom: '50px', color: '#333' }}>
              What Our Franchisees Say
            </h2>

            <div className="row">
              <div className="col-md-6">
                <div style={styles.testimonialCard}>
                  <p style={{ fontStyle: 'italic', fontSize: '18px', lineHeight: '1.6' }}>
                    "The Banjos team made setup seamless. We got full training, branding help, and now see 200+ daily footfall."
                  </p>
                  <p style={{ fontWeight: '600', marginTop: '20px' }}>
                    – Rohan Patil, Franchisee – Nashik
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div style={styles.testimonialCard}>
                  <p style={{ fontStyle: 'italic', fontSize: '18px', lineHeight: '1.6' }}>
                    "Tasty, fresh, and a hit with students. We're opening our second outlet now."
                  </p>
                  <p style={{ fontWeight: '600', marginTop: '20px' }}>
                    – Anita R., Franchisee – Pune
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: '50px' }}>
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
            </div>
          </div>
        </motion.section>
      )}

      {/* Apply Now Section */}
      {(activeTab === 'apply' || activeTab === 'all') && (
        <motion.section 
          style={styles.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>Apply Now to Become a Banjos Franchise Partner</h2>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Fill in your details below to get started. City rights are limited – Apply now to secure your location!
              </p>
            </motion.div>

            <div className="row">
              <div className="col-lg-6" style={styles.reservationImg}></div>

              <div className="col-lg-6" style={styles.reservationFormBg}>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="user_name"
                        style={styles.formControl}
                        placeholder="Full Name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="user_email"
                        style={styles.formControl}
                        placeholder="Your Email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="user_phone"
                        style={styles.formControl}
                        placeholder="Phone Number"
                        value={formData.user_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="profession"
                        style={styles.formControl}
                        placeholder="Current Profession / Job Title"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <Select
                        options={countryOptions}
                        value={countryOptions.find((c) => c.value === formData.requested_country)}
                        onChange={handleCountryChange}
                        placeholder="Select Country"
                        styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        options={stateOptions}
                        value={stateOptions.find((s) => s.value === formData.requested_state)}
                        onChange={handleStateChange}
                        placeholder="Select State"
                        isDisabled={!formData.requested_country}
                        styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        options={cityOptions}
                        value={cityOptions.find((c) => c.value === formData.requested_city)}
                        onChange={handleCityChange}
                        placeholder="Select City"
                        isDisabled={!formData.requested_state}
                        styles={{ control: (base) => ({ ...base, marginBottom: '15px' }) }}
                      />
                    </div>
                    
                    <div className="col-md-12">
                      <p style={{ marginBottom: '10px' }}>What's the range of investment you are looking for?</p>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input type="radio" name="investment_range" value="15-20" style={{ marginRight: '10px' }} />
                          Rs. 15–20 Lakh
                        </label>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input type="radio" name="investment_range" value="20-25" style={{ marginRight: '10px' }} />
                          Rs. 20–25 Lakh
                        </label>
                        <label style={{ display: 'block', marginBottom: '20px' }}>
                          <input type="radio" name="investment_range" value="25+" style={{ marginRight: '10px' }} />
                          25 Lakhs +
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <p style={{ marginBottom: '10px' }}>Are you currently holding any franchise?</p>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input type="radio" name="franchise_experience" value="none" style={{ marginRight: '10px' }} />
                          No, I do not own any franchise
                        </label>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input type="radio" name="franchise_experience" value="other" style={{ marginRight: '10px' }} />
                          Yes, but not in the food sector
                        </label>
                        <label style={{ display: 'block', marginBottom: '20px' }}>
                          <input type="radio" name="franchise_experience" value="food" style={{ marginRight: '10px' }} />
                          Yes, I own a franchise in the food sector
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <input
                        type="number"
                        name="investment_budget"
                        style={styles.formControl}
                        placeholder="Investment Budget"
                        value={formData.investment_budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="experience_in_food_business"
                        style={{ ...styles.formControl, minHeight: '100px' }}
                        placeholder="Experience in Food Business"
                        value={formData.experience_in_food_business}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="additional_details"
                        style={{ ...styles.formControl, minHeight: '100px' }}
                        placeholder="Additional Details"
                        value={formData.additional_details}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {submitted && <p style={{ color: 'green' }}>Request submitted successfully!</p>}

                  <button
                    type="submit"
                    style={{
                      ...styles.submitButton,
                      ...(loading && { opacity: 0.6, cursor: 'not-allowed' }),
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit & Apply Now'}
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: '50px' }}>
              <h3 style={{ marginBottom: '20px' }}>Be a Part of India's QSR Boom</h3>
              <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
                BANJOS – Your Next Big Bite Into India's QSR Boom!
              </p>
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
                  marginTop: '30px'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📥 Download Franchise Brochure
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default Franchise;