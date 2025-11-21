import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Menu from './Menu/Menu';
import WhyUs from './WhyUs/WhyUs';
import Testimonials from './Testimonials/Testimonials';
import Gallery from './Gallery/Gallery';
import About from './About/About';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import AboutPage from './About/AboutPage';
import MenuPage from './Menu/MenuPage';
import Events from './Events/Events';
import Job from './Job/Job';
import Galleryin from './Gallery/Galleryin';
import Contactus from './Contact/Contactus';
import Feedback from './Contact/Feedback';
import Login from './Login/Login';
import GalleryDetails from './Gallery/GalleryDetails';
import Branches from './Branches/Branches';
import Franchise from '../website/Franchise/Franchise';
import AppetizerSections from './services/AppetizerSections'
import './GoshalaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import restaurantbg from '../assets/brand/background.jpg'
// Loading Screen Component
const LoadingScreen = () => (
  <div className="loading-overlay">
    <img 
      src="/pizza.gif"  // Make sure pizza.gif is in public folder
      alt="Loading..." 
      className="loading-gif"
    />
    <div className="loading-text">Serving Hot Content...</div>
  </div>
);

// Home Component
const Home = () => (
  <>
    <Hero />
    <About />
    <AppetizerSections/>
    <WhyUs />
    <Menu />
    <Testimonials />
    <Gallery />
    <Contact />
  </>
);

// Main Component
function WebIndex() {
  const [isLoading, setIsLoading] = useState(true);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = {restaurantbg}; // Same path as in CSS
    img.onload = () => {
      // Simulate loading time (you can adjust this)
      setTimeout(() => setIsLoading(false), 2000);
    };
    img.onerror = () => {
      // If image fails to load, still continue
      setTimeout(() => setIsLoading(false), 2000);
    };
  }, []);

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen />}
      
      <Header />
      <main className={isLoading ? 'content-hidden' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Job" element={<Job />} />
          <Route path="/Galleryin" element={<Galleryin />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Franchise" element={<Franchise />} />
          <Route path="/Branches" element={<Branches />} />
          <Route path="/GalleryDetails" element={<GalleryDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default WebIndex;