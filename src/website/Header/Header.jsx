import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/banjos.png';
import { FaFileDownload } from 'react-icons/fa';

// Constants
const NAV_ITEMS = [
  { path: '/', label: 'Home', end: true },
  { path: '/WebIndex/about', label: 'About' },
  { path: '/WebIndex/menu', label: 'Menu' },
  { path: '/WebIndex/Branches', label: 'Branches' },
  { path: '/WebIndex/Galleryin', label: 'Gallery' },
  { path: '/WebIndex/Job', label: 'Career' },
  { path: '/WebIndex/contact', label: 'Contact' },
];

// Styled components (improved versions)
const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 20px 0;

  &.scrolled {
    position: fixed;
    background: rgba(32, 32, 32, 0.98);
    padding: 12px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(8px);
    animation: fadeInDown 0.5s ease forwards;

    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(RouterNavLink).attrs({ 'aria-label': 'Home' })`
  img {
    max-width: 180px;
    transition: all 0.3s ease;
    height: auto;
    display: block;

    .scrolled & {
      max-width: 150px;
    }
  }

  &:focus {
    outline: 2px solid #f0e70c;
    outline-offset: 4px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 320px;
    height: 100vh;
    background: #202020;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 80px;
    transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
    z-index: 999;

    &.active {
      right: 0;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    }
  }
`;

const BookButton = styled(RouterNavLink).attrs({ 
  to: '/WebIndex/Franchise',
  'aria-label': 'Franchise Inquiry'
})`
  color: #000;
  min-width: 220px;
  padding: 12px 24px;
  display: inline-block;
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 16px;
  background: #f0e70c;
  border: 2px solid #f0e70c;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin: 0 0 0 20px;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  &:hover, &:focus {
    background: transparent;
    color: #f0e70c;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: transparent;
    transition: all 0.4s ease;
  }

  &:hover::before {
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 992px) {
    margin: 30px 0 0 0;
    width: 80%;
  }

  @media (max-width: 480px) {
    min-width: 180px;
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 992px) {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 8px;

  @media (max-width: 992px) {
    margin: 12px 0;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.4s ease;

    .active & {
      opacity: 1;
      transform: translateX(0);
      transition-delay: ${props => 0.1 + (props.index * 0.05)}s;
    }
  }
`;

const NavLink = styled(RouterNavLink)`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 12px;
  position: relative;
  transition: all 0.3s ease;
  font-size: 14px;
  text-decoration: none;
  border-radius: 4px;

  &:hover, &:focus {
    color: #f0e70c;
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 12px;
    width: calc(100% - 24px);
    height: 2px;
    background: #f0e70c;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover::after, &:focus::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &.active {
    color: #f0e70c;
    font-weight: 600;

    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 992px) {
    display: block;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid transparent;

    &:hover, &:focus {
      border-color: rgba(240, 231, 12, 0.3);
    }
  }
`;

const MobileMenuButton = styled.button.attrs({ 
  'aria-label': 'Menu',
  'aria-expanded': props => props['aria-expanded']
})`
  display: none;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px;
  z-index: 1000;
  position: relative;

  @media (max-width: 992px) {
    display: block;
  }

  .icon-bar {
    display: block;
    width: 28px;
    height: 3px;
    background: #fff;
    margin: 5px 0;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &[aria-expanded="true"] .icon-bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  &[aria-expanded="true"] .icon-bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  &[aria-expanded="true"] .icon-bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  &:focus {
    outline: 2px solid #f0e70c;
    outline-offset: 2px;
  }
`;

const Overlay = styled.div.attrs({ 'aria-hidden': true })`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const DownloadButton = styled.a.attrs({ 
  'aria-label': 'Download Menu',
  download: 'Banjos_Menu.pdf',
  href: '/path/to/your/file.pdf'
})`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 16px;
  margin-left: 20px;
  transition: all 0.3s ease;
  font-size: 14px;
  text-decoration: none;
  border: 1px solid #f0e70c;
  border-radius: 4px;
  background: rgba(240, 231, 12, 0.1);

  &:hover, &:focus {
    background: #f0e70c;
    color: #000;
    outline: none;
  }

  svg {
    margin-right: 8px;
    font-size: 16px;
  }

  @media (max-width: 992px) {
    margin: 20px 0 0 0;
    width: 80%;
    justify-content: center;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 100);
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 20);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Simple debounce function
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  return (
    <HeaderWrapper className={isScrolled ? 'scrolled' : ''}>
      <NavContainer>
        <Logo to="/">
          <img 
            src={logo} 
            alt="Banjos Logo" 
            loading="lazy"
            width="180"
            height="auto"
          />
        </Logo>

        <MobileMenuButton 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </MobileMenuButton>

        <NavMenu className={isMenuOpen ? 'active' : ''}>
          <NavList>
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={item.path} index={index}>
                <NavLink 
                  to={item.path} 
                  end={item.end}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
          
          <BookButton>
            Franchise Inquiry
          </BookButton>
          
          {/* <DownloadButton>
            <FaFileDownload />
     
          </DownloadButton> */}
        </NavMenu>

        <Overlay 
          className={isMenuOpen ? 'active' : ''} 
          onClick={closeMenu}
        />
      </NavContainer>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  // Add prop types if needed
};

export default Header;