import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import reservation from '../../../assets/img/reservation.jpg';
import { BASE_URL } from '../../../config';

const ApplySection = () => {
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
    alert('Downloading franchise brochure...');
  };

  return (
    <section className="section-padding" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
      <div className="container">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>Apply Now to Become a Banjos Franchise Partner</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
            Fill in your details below to get started. City rights are limited – Apply now to secure your location!
          </p>
        </motion.div>

        <motion.div 
          className="row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="col-lg-6" style={{
            backgroundImage: `url(${reservation})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px',
            borderRadius: '10px'
          }}></div>

          <div className="col-lg-6" style={{
            backgroundColor: '#fff',
            padding: '40px',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px'
          }}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="user_name"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                    }}
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
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                    }}
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
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                    }}
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
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                    }}
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
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                    }}
                    placeholder="Investment Budget"
                    value={formData.investment_budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="experience_in_food_business"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      minHeight: '100px'
                    }}
                    placeholder="Experience in Food Business"
                    value={formData.experience_in_food_business}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <textarea
                    name="additional_details"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      minHeight: '100px'
                    }}
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
                  backgroundColor: '#d6ca14',
                  color: '#333',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  ...(loading && { opacity: 0.6, cursor: 'not-allowed' }),
                }}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit & Apply Now'}
              </button>
            </form>
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
        </motion.div>
      </div>
    </section>
  );
};

export default ApplySection;