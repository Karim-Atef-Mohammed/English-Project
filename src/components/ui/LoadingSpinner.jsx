import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #0f0f16;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Circle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  
  &.outer {
    border-top-color: #0c87e8;
  }
  
  &.middle {
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    border-right-color: #d712ff;
  }
  
  &.inner {
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    border-bottom-color: #10bfe5;
  }
`;

const LogoText = styled(motion.h1)`
  font-size: 1.5rem;
  margin-top: 2rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 1px;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <Circle 
          className="outer"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <Circle 
          className="middle"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <Circle 
          className="inner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </SpinnerWrapper>
      <LogoText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Chromatic Shift Survey
      </LogoText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;