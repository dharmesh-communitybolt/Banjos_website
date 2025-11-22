import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/img/conta.jpg";
import { BASE_URL } from '../../config'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    rating: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Fetch branches data from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setMapLoading(true);
        const response = await fetch(`${BASE_URL}/branches/`);
        if (response.ok) {
          const data = await response.json();
          setBranches(data);
          // Set first branch as default
          if (data.length > 0) {
            setSelectedBranch(data[0]);
          }
        } else {
          console.error("Failed to fetch branches");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setMapLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Generate Google Maps URL for selected branch
  const generateMapUrl = (branch) => {
    if (!branch) {
      return "https://www.google.com/maps/d/u/0/embed?mid=1-ihulsNBqai5QC5sNQnqDmG994SvZdVR";
    }

    // Use the actual coordinates from API
    if (branch.latitude && branch.longitude && branch.latitude > 0 && branch.longitude > 0) {
      return `https://maps.google.com/maps?q=${branch.latitude},${branch.longitude}&z=15&output=embed`;
    } else {
      // Fallback to original map if coordinates are invalid
      return "https://www.google.com/maps/d/u/0/embed?mid=1-ihulsNBqai5QC5sNQnqDmG994SvZdVR";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("description", formData.description);
      form.append("rating", formData.rating);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch(`${BASE_URL}/testimonial/`, {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", description: "", rating: 0, image: null });
      } else {
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact section" style={{ position: 'relative', padding: '3rem 0', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(0.7)'
      }}></div>

      <style>{`
        .dark-placeholder::placeholder {
          color: #100f0f;
          opacity: 1;
        }
        .branch-selector {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .branch-selector:hover {
          background-color: rgba(240, 231, 12, 0.2) !important;
        }
        .branch-selector.active {
          background-color: rgba(240, 231, 12, 0.3) !important;
          border-left: 4px solid #f0e70c !important;
        }
      `}</style>

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: -1
      }}></div>

      {/* Title */}
      <div className="container section-title" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem' }}>
        <h2 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Contact</h2>
        <div style={{ color: '#fff' }}>
          Get In <span style={{ color: '#f0e70c' }}>Touch</span>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem' }}>
        <div className="row gy-5 gx-lg-5">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="info" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '25px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
              height: '100%'
            }}>
              <h3 style={{ color: '#333' }}>Contact Info</h3>
              <p style={{ color: '#555' }}>We'd love to hear from you!</p>
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0" style={{ color: '#f0e70c', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333' }}>Location:</h4>
                  <p style={{ color: '#555' }}>Plot No 62, Lane No 4, Pandit Colony, Nashik 422002</p>
                </div>
              </div>
              <div className="info-item d-flex mt-4">
                <i className="bi bi-envelope flex-shrink-0" style={{ color: '#f0e70c', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333' }}>Email:</h4>
                  <p style={{ color: '#555' }}>banjosthefoodchain@gmail.com</p>
                </div>
              </div>
              <div className="info-item d-flex mt-4">
                <i className="bi bi-phone flex-shrink-0" style={{ color: '#f0e70c', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333' }}>Call:</h4>
                  <p style={{ color: '#555' }}>+91 9112222066</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="php-email-form" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
            }}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control dark-placeholder" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" name="email" className="form-control dark-placeholder" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group mt-3">
                <textarea name="description" className="form-control dark-placeholder" placeholder="Your Message" rows="5" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              {/* Rating and Upload */}
              <div className="form-group mt-3">
                <div className="d-flex flex-column flex-md-row align-items-md-center">
                  <div className="mb-3 mb-md-0 me-md-4">
                    <label className="d-block mb-2">Rate Us:</label>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} style={{ fontSize: "28px", cursor: "pointer", marginRight: "8px" }}>
                          <input type="radio" name="rating" value={star} checked={formData.rating === star} onChange={() => setFormData((prev) => ({ ...prev, rating: star }))} style={{ display: "none" }} />
                          {star <= formData.rating ? "⭐" : "☆"}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="d-block mb-2">Upload Image:</label>
                    <input type="file" name="image" className="form-control" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="my-3">
                {loading && <div style={{ color: '#f0e70c', textAlign: 'center' }}>Sending your message...</div>}
                {message && <div style={{ color: message.includes("error") ? '#dc3545' : '#28a745', fontWeight: '500', textAlign: 'center' }}>{message}</div>}
              </div>

              {/* Submit */}
              <div className="text-center">
                <button type="submit" disabled={loading} style={{
                  background: '#f0e70c',
                  border: 'none',
                  padding: '12px 35px',
                  borderRadius: '4px',
                  color: 'black',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: '600',
                  width: '100%',
                  maxWidth: '250px'
                }}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section with Branch Selection */}
      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>
            Our Branch Locations
          </h3>
          
          {mapLoading ? (
            <div style={{ 
              height: '400px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ color: '#f0e70c', fontSize: '1.2rem' }}>
                Loading branches...
              </div>
            </div>
          ) : (
            <div className="row">
              {/* Branch Selection Sidebar */}
              <div className="col-lg-4 mb-4">
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  height: '100%',
                  border: '1px solid #dee2e6'
                }}>
                  <h5 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                    Select a Branch ({branches.length})
                  </h5>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {branches.map((branch) => (
                      <div 
                        key={branch.id} 
                        className={`branch-selector mb-3 p-3 ${selectedBranch?.id === branch.id ? 'active' : ''}`}
                        style={{ 
                          borderLeft: '3px solid #f0e70c', 
                          backgroundColor: selectedBranch?.id === branch.id ? 'rgba(240, 231, 12, 0.3)' : 'rgba(240, 231, 12, 0.1)',
                          borderRadius: '4px'
                        }}
                        onClick={() => handleBranchSelect(branch)}
                      >
                        <strong style={{ color: '#333', fontSize: '0.9rem' }}>{branch.name}</strong>
                        <p style={{ color: '#555', fontSize: '0.8rem', margin: '5px 0' }}>
                          {branch.address}
                        </p>
                        <p style={{ color: '#666', fontSize: '0.7rem', margin: '2px 0' }}>
                          📞 {branch.phone_number}
                        </p>
                        <p style={{ color: '#666', fontSize: '0.7rem', margin: '2px 0' }}>
                          🕒 {branch.opening_hours}
                        </p>
                        {branch.latitude && branch.longitude && (
                          <p style={{ color: '#888', fontSize: '0.6rem', margin: '2px 0' }}>
                            📍 {branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="col-lg-8">
                {selectedBranch && (
                  <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <h5 style={{ color: '#333', marginBottom: '8px' }}>{selectedBranch.name}</h5>
                    <p style={{ color: '#555', margin: '2px 0', fontSize: '0.9rem' }}>
                      <strong>Address:</strong> {selectedBranch.address}
                    </p>
                    <p style={{ color: '#555', margin: '2px 0', fontSize: '0.9rem' }}>
                      <strong>Phone:</strong> {selectedBranch.phone_number}
                    </p>
                    <p style={{ color: '#555', margin: '2px 0', fontSize: '0.9rem' }}>
                      <strong>Hours:</strong> {selectedBranch.opening_hours}
                    </p>
                    {selectedBranch.manager_name && (
                      <p style={{ color: '#555', margin: '2px 0', fontSize: '0.9rem' }}>
                        <strong>Manager:</strong> {selectedBranch.manager_name}
                      </p>
                    )}
                  </div>
                )}
                
                <iframe
                  title="Branch Location Map"
                  style={{ 
                    width: "100%", 
                    height: "400px", 
                    border: 'none', 
                    borderRadius: '8px' 
                  }}
                  src={generateMapUrl(selectedBranch)}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;