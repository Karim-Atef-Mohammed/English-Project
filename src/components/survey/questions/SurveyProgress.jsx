import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  border-radius: 4px;
  transform-origin: left;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepInfo = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
`;

const PercentageInfo = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
`;

const StepDots = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const StepDot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 12px;
    width: calc(100% - 6px);
    height: 2px;
    background-color: ${props => props["data-completed"] === "true" ? 'rgba(12, 135, 232, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
    z-index: 0;
  }
`;

const Dot = styled(motion.div)`
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

const DotLabel = styled.span`
  font-size: 0.75rem;
  color: ${props => props["data-active"] === "true" ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  position: absolute;
  top: 16px;
  transform: translateX(-50%);
  white-space: nowrap;
  display: ${props => props["data-visible"] === "true" ? 'block' : 'none'};
`;

const SurveyProgress = ({ currentStep, totalSteps, stepTitles }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <ProgressContainer>
      <ProgressBar>
        <ProgressFill 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>
      
      <ProgressInfo>
        <StepInfo>Step {currentStep} of {totalSteps}</StepInfo>
        <PercentageInfo>{Math.floor(progress)}% Complete</PercentageInfo>
      </ProgressInfo>
      
      {stepTitles && (
        <StepDots>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index === currentStep - 1;
            const isCompleted = index < currentStep - 1;
            const isVisible = index === currentStep - 1 || index === currentStep - 2 || index === currentStep;
            
            return (
              <StepDot 
                key={index}
                data-completed={isCompleted.toString()}
                style={{ width: `${100 / (totalSteps - 1)}%` }}
              >
                <Dot 
                  data-active={isActive.toString()}
                  data-completed={isCompleted.toString()}
                  whileHover={{ scale: 1.2 }}
                  animate={isActive ? { 
                    scale: [1, 1.2, 1],
                    transition: { 
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      duration: 1
                    } 
                  } : {}}
                />
                <DotLabel 
                  data-active={isActive.toString()}
                  data-visible={isVisible.toString()}
                >
                  {stepTitles[index]}
                </DotLabel>
              </StepDot>
            )
          })}
        </StepDots>
      )}
    </ProgressContainer>
  );
};

export default SurveyProgress;