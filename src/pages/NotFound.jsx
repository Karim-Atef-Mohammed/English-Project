import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NotFoundContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 0 20px;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HomeButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(12, 135, 232, 0.3);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Oops! The page you're looking for doesn't exist.</NotFoundText>
      <HomeButton to="/">Return to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;