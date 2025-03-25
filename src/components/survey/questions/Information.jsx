import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const QuestionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const InformationText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.8;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const NextButton = styled(motion.button)`
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const Information = ({ question, onChange }) => {
  // Since this is just information, we'll create a dummy change handler
  // that indicates the user has viewed this information
  const handleContinue = () => {
    if (onChange) {
      onChange({ viewed: true });
    }
  };
  
  // Auto-mark as viewed for introduction
  React.useEffect(() => {
    if (question && question.id === 'intro') {
      handleContinue();
    }
  }, [question]);
  
  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <InformationText>
        {question.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </InformationText>
      
      {/* Only show the button if it's not the intro section */}
      {question && question.id !== 'intro' && (
        <NextButton
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
        >
          Next Question
        </NextButton>
      )}
    </div>
  );
};

export default Information;