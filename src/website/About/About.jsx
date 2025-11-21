import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Burger from "../../assets/img/menu/cake.jpg";
import Pizza from "../../assets/img/menu/bread-barrel.jpg";
import Salad from "../../assets/img/menu/greek-salad.jpg";
import Pasta from "../../assets/img/menu/lobster-bisque.jpg";
import imgbg from "../../assets/img/bg.jpg";
import banjos from "../../assets/images/banjos.png";
const AboutUs = () => {
  const rotatingItems = [
    { id: 1, name: "Burger", img: Burger },
    { id: 2, name: "Pizza", img: Pizza },
    { id: 3, name: "Salad", img: Salad },
    { id: 4, name: "Pasta", img: Pasta },
  ];

  const Signature = styled.img`
    width: 150px; /* Adjust size as needed */
    height: 150px;
    border-radius: 50%; /* Makes it circular */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Shadow */
    background-color: black; /* Black background */
    object-fit: cover; /* Ensures it fills the circle properly */
    padding: 10px; /* Optional: space between image and background */
  `;

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".rotating-item");
    const radius = 150; // Radius of the circle
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    const positionItems = () => {
      items.forEach((item, index) => {
        // Calculate angle for each item (90° apart)
        const angle = index * (Math.PI / 2); // 4 items at 90° intervals
        const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.setProperty("--i", index); // Set CSS variable for animation delay
      });
    };

    positionItems();
    window.addEventListener("resize", positionItems);

    return () => window.removeEventListener("resize", positionItems);
  }, []);

  return (
    <Section id="about">
      <Container>
        <Row>
          <ImageColumn>
            <ImageContainer ref={containerRef}>
              <MainImage src={imgbg} alt="Our Restaurant" />
              {rotatingItems.map((item, index) => (
                <RotatingItem key={item.id} className="rotating-item">
                  <FoodImage src={item.img} alt={item.name} />
                  <FoodName>{item.name}</FoodName>
                </RotatingItem>
              ))}
              <ExperienceBadge>
                <ExperienceYears>12+</ExperienceYears>
                <ExperienceText>Years Experience</ExperienceText>
              </ExperienceBadge>
            </ImageContainer>
          </ImageColumn>

          <ContentColumn>
            <SubTitle>About Us</SubTitle>
            <Title>We Cook the Best Tasty Food</Title>
            <Text>
              Take two freshly baked buns with an appetizing stuffing of richly
              flavored quality and you have a Banjo! Originated in 2017, from a
              passion to revolutionize bun-based cuisine.
            </Text>
            <Text>
              Banjos serves a diversified fast food menu to satisfy all tastes.
              We are a Nashik-based food chain with deep local roots. We&apos;ve
              grown tremendously based on our uncompromising quality standards.
              Our first outlet on College Road started with a small range of
              delicious burgers, pizzas, sandwiches, and beverages. Today, we
              continue that tradition of excellence across multiple locations.
            </Text>
            <Signature
              src={banjos}
              alt="Chef Signature"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                backgroundColor: "black",
                objectFit: "contain",
                padding: "10px", // Optional
              }}
            />
          </ContentColumn>
        </Row>
      </Container>
    </Section>
  );
};

// Animations
const floatAnimation = keyframes`
  0% { 
    transform: translateY(0px) rotate(0deg);
  }
  50% { 
    transform: translateY(-20px) rotate(5deg);
  }
  100% { 
    transform: translateY(0px) rotate(0deg);
  }
`;

// Styled Components
const Section = styled.section`
  padding: 100px 0;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -15px;
`;

const ImageColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;
  position: relative;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 50px;
  }
`;

const ContentColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 500px;
  width: 100%;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RotatingItem = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.5s);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FoodImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const FoodName = styled.span`
  position: absolute;
  bottom: -25px;
  background: #ff6b6b;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${RotatingItem}:hover & {
    opacity: 1;
  }
`;

const ExperienceBadge = styled.div`
  position: absolute;
  bottom: -20px;
  right: 30px;
  background-color: #ff6b6b;
  color: #fff;
  padding: 15px 25px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  z-index: 3;
`;

const ExperienceYears = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 5px;
`;

const ExperienceText = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const SubTitle = styled.span`
  font-size: 14px;
  color: #ff6b6b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
  display: block;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
`;

const Signature = styled.img`
  margin-top: 30px;
  display: block;
  max-width: 200px;
`;

export default AboutUs;
