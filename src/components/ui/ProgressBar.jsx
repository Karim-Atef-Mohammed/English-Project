import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const ProgressBarWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  transform-origin: left;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 1rem;
`;

const Step = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Change it to:
const StepDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => 
    props["data-active"] === "true"
      ? 'linear-gradient(90deg, #0c87e8, #d712ff)' 
      : props["data-completed"] === "true" 
        ? '#0c87e8' 
        : 'rgba(255, 255, 255, 0.3)'
  };
  margin-bottom: 8px;
  z-index: 1;
  position: relative;
`;

const StepLabel = styled(motion.div)`
  position: absolute;
  top: 20px;
  font-size: 0.75rem;
  color: ${props => props["data-active"] === "true" ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  max-width: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

    @media (max-width: 768px) {
    font-size: 0.5rem; /* Smaller font on mobile */
  }

  /* Even smaller for very small screens */
  @media (max-width: 480px) {
    font-size: 0.4rem;
  }
`;

const ProgressBar = ({ 
  current, 
  total, 
  steps = [] 
}) => {
  // Calculate progress percentage
  const progress = (current / total) * 100;
  
  // If steps are provided, render them. Otherwise, render a simple progress bar
  const hasSteps = steps.length > 0;
  
  return (
    <ProgressBarContainer>
      <ProgressBarWrapper>
        <ProgressFill 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </ProgressBarWrapper>
      
      <ProgressText>
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </ProgressText>
      
      {hasSteps && (
        <ProgressSteps>
          {steps.map((step, index) => {
            const isCompleted = index < current;
            const isActive = index === current - 1;
            
            return (
              <Step key={index}>
                <StepDot 
                  data-active={isActive.toString()}
                  data-completed={isCompleted.toString()}
                  animate={{ 
                    scale: isActive ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                    duration: 1.5
                  }}
                />
                <StepLabel 
                  data-active={isActive.toString()}
                  animate={{ 
                    opacity: isCompleted || isActive ? 1 : 0.5
                  }}
                >
                  {step}
                </StepLabel>
              </Step>
            );
          })}
        </ProgressSteps>
      )}
    </ProgressBarContainer>
  );
};

export default ProgressBar;