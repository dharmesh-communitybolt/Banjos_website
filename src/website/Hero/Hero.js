import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styled, { keyframes } from 'styled-components';
import img from '../../assets/images/banner.jpg';

// Keyframes animations
const scrollWheel = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 20px);
    opacity: 0;
  }

  @media (min-width: 768px) {
    to {
      transform: translate(-50%, 40px);
    }
  }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// Styled components
const BannerContainer = styled.section`
  background: url(${props => props.bgImage || 'none'}) no-repeat center top;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
  min-height: 100%;
  width: 100%;
  position: relative;
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerText = styled.div`
  display: table;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const BannerCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  color: #fff;
  padding: 0 20px;
`;

const MainHeading = styled.h1`
  font-family: 'nautilus_pompiliusregular', serif;
  letter-spacing: 2.7px;
  position: relative;
  display: inline-block;
  font-size: 74px;
  line-height: 1.2;
  color: #fff;
  padding-bottom: 0;
  margin: 0 0 20px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 48px;
    padding-top: 60px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const TypingText = styled.span`
  color: #f0e70c;
`;

const TypingCursor = styled.span`
  color: #f0e70c;
  animation: ${blink} 0.7s infinite;
`;

const SubHeading = styled.h2`
  font-family: 'nautilus_pompiliusregular', serif;
  letter-spacing: 2.7px;
  position: relative;
  font-size: 37px;
  line-height: 1.2;
  padding-bottom: 25px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    padding-bottom: 15px;
  }
`;

const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #ccc;
  padding-bottom: 35px;
  margin: 0 auto;
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 16px;
    padding-bottom: 25px;
  }
`;

const BookButton = styled.a`
  color: black;
  min-width: 219px;
  padding: 12px 20px;
  display: inline-block;
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 18px;
  background: #f0e70c;
  border: 3px solid #f0e70c;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 1 !important;
  margin-bottom: 40px;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 50%;
    right: 50%;
    bottom: 0;
    background: #fff;
    height: 2px;
    transition: all 0.3s ease-out;
  }

  &:hover::before {
    left: 0;
    right: 0;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    min-width: 180px;
    padding: 10px 15px;
  }
`;
const MouseIndicator = styled.div`
  position: relative;
  width: 32px;
  height: 62px;
  margin: 60px auto 20px;
  background: none;
  border: 2px solid white;
  border-radius: 32px;
  z-index: 1;

  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: none;
    border: 2px solid white;
    border-radius: 100%;
    animation: ${scrollWheel} 1.4s forwards infinite ease;
    transform: translateX(-50%);
  }
`;

const Banner = () => {
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const words = ['Friends', 'Family', 'Love'];
  
  // Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopNum % words.length];
      const updatedText = isDeleting 
        ? currentWord.substring(0, typingText.length - 1)
        : currentWord.substring(0, typingText.length + 1);
      
      setTypingText(updatedText);
      
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        const speed = isDeleting ? 75 : 150;
        setTypingSpeed(speed);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum]);

  // GSAP animations
  useEffect(() => {
    gsap.from(".main-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });
    
    gsap.from(".sub-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });
    
    gsap.from(".description", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.9,
      ease: "back.out"
    });
    
    gsap.from(".book-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);

  return (
    <BannerContainer id="banner" bgImage={img}>
      <InnerContainer className='mt-5'>
        <BannerText>
          <BannerCell>
            
            {/* <BookButton href="/WebIndex/Franchise" className="book-btn hvr-underline-from-center">
               Franchise  Inquiry
            </BookButton> */}
            <a href="#about">
              <MouseIndicator />
            </a>
          </BannerCell>
        </BannerText>
      </InnerContainer>
    </BannerContainer>
  );
};

export default Banner;