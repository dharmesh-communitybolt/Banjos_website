import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaPhoneAlt,
  FaDirections,
  FaShareAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const NearbyBranchLayout = () => {
  const [location, setLocation] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null); // Track selected branch

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      () => alert("Location access denied."),
      { enableHighAccuracy: true }
    );

    // Fetch branches from API
    fetchBranches().then(setBranches);
  }, []);

  const fetchBranches = async () => {
    // Replace this with your real API
    return [
      {
        name: "Banjo's Cafe - Pune",
        phone: "9876543210",
        lat: 18.5204,
        lng: 73.8567,
        image: "https://source.unsplash.com/300x200/?restaurant,cafe",
      },
      {
        name: "Banjo's Cafe - Shivaji Nagar",
        phone: "9876543222",
        lat: 18.5300,
        lng: 73.8500,
        image: "https://source.unsplash.com/300x200/?restaurant,food",
      },
      {
        name: "Banjo's Cafe - Mumbai",
        phone: "9876543233",
        lat: 19.0760,
        lng: 72.8777,
        image: "https://source.unsplash.com/300x200/?restaurant,coffee",
      },
    ];
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredBranches = location
    ? branches.filter(
        (branch) =>
          calculateDistance(location.lat, location.lng, branch.lat, branch.lng) <= 5
      )
    : [];

  const handleShare = async (branch) => {
    if (navigator.share) {
      await navigator.share({
        title: branch.name,
        url: `https://maps.google.com/?q=${branch.lat},${branch.lng}`,
      });
    } else {
      alert("Share not supported on this device.");
    }
  };

  const renderMap = () => {
    if (!location) return null;

    return (
      <div style={{ height: "200px", width: "100%", marginTop: "20px" }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.lat},${location.lng}`}
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={styles.pin}>
        📍
      </motion.div>

      {/* LEFT: Location Info */}
      <div style={styles.locationCard}>
        <h1 style={styles.title}>Your Location</h1>
        <Tilt glareEnable glareMaxOpacity={0.2} scale={1.03}>
          <motion.div whileHover={{ scale: 1.02 }} style={styles.card}>
            <div style={styles.iconRow}>
              <FaMapMarkerAlt style={styles.locationIcon} />
            </div>
            <h2 style={styles.subtitle}>Location</h2>
            <h3 style={styles.branchName}>Current Location</h3>
            <p style={styles.description}>
              {location
                ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`
                : "Fetching location..."}
            </p>
            <p style={styles.description}>
              {filteredBranches.length} branches found within 5km radius.
            </p>

            {/* Google Map showing user location */}
            {renderMap()}
          </motion.div>
        </Tilt>
      </div>

      {/* RIGHT: Banjo's Cards */}
      <div style={styles.branchesColumn}>
        {filteredBranches.map((branch, index) => (
          <Tilt key={index} glareEnable glareMaxOpacity={0.2} scale={1.03}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={styles.branchCard}
              onClick={() => setSelectedBranch(selectedBranch === branch ? null : branch)} // Toggle branch details
            >
              <img src={branch.image} alt={branch.name} style={styles.image} />
              <h3 style={styles.branchName}>{branch.name}</h3>

              {/* Show buttons only when the branch is selected */}
              {selectedBranch === branch && (
                <div style={styles.actionButtons}>
                  <motion.a href={`tel:${branch.phone}`} style={styles.icon} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <FaPhoneAlt />
                  </motion.a>
                  <motion.a href={`https://maps.google.com/?q=${branch.lat},${branch.lng}`} target="_blank" rel="noopener noreferrer" style={styles.icon} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <FaDirections />
                  </motion.a>
                  <motion.button onClick={() => handleShare(branch)} style={styles.icon} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <FaShareAlt />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
    fontFamily: "sans-serif",
    justifyContent: "center",
    gap: "40px",
  },
  locationCard: {
    flex: "1 1 350px",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  branchesColumn: {
    flex: "1 1 350px",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#444",
    marginBottom: "10px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
  },
  branchCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    cursor: "pointer", // For click effect
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "15px",
    marginBottom: "15px",
  },
  branchName: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  },
  actionButtons: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  icon: {
    fontSize: "1.3rem",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "50%",
    color: "#333",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  iconRow: {
    position: "absolute",
    top: "15px",
    left: "15px",
    fontSize: "1.5rem",
    color: "#ec4899", // pink-500 color
  },
  locationIcon: {
    fontSize: "1.5rem",
  },
  pin: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
};

export default NearbyBranchLayout;
