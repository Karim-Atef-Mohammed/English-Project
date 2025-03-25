import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import Button from '../ui/Button';

const CompletionContainer = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0c87e8, #d712ff);
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 60px;
    height: 60px;
    color: white;
  }
`;

const CompletionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const CompletionText = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SurveyCompletion = () => {
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        colors={['#0c87e8', '#d712ff', '#10bfe5', '#ffffff']}
      />
      
      <CompletionContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
          </svg>
        </SuccessIcon>
        
        <CompletionTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Survey Completed!
        </CompletionTitle>
        
        <CompletionText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Thank you for participating in our research on chromatic shifts in brand identity.
          Your responses have been successfully recorded and will help advance our understanding
          of how color changes affect brand perception.
        </CompletionText>
        
        <ButtonContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/">
            <Button variant="secondary">Return Home</Button>
          </Link>
          <Link to="/about">
            <Button>Learn More About the Study</Button>
          </Link>
        </ButtonContainer>
      </CompletionContainer>
    </>
  );
};

export default SurveyCompletion;