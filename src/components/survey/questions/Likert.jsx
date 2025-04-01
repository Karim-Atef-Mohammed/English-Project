import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const QuestionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const QuestionDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StatementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatementCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Statement = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.5;
`;

const ScaleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto auto;
    gap: 1rem;
  }
`;

const ScaleOption = styled(motion.button)`
  padding: 1rem 0.5rem;
  background: ${props => props.selected ? 
    'linear-gradient(135deg, rgba(12, 135, 232, 0.3), rgba(215, 18, 255, 0.3))' : 
    'rgba(255, 255, 255, 0.05)'
  };
  color: white;
  border: 1px solid ${props => props.selected ? '#d712ff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  font-size: 0.9rem;
  
  @media (max-width: 640px) {
    grid-column: ${props => props.span || 'auto'};
    padding: 0.75rem 0.5rem;
  }
  
  &:hover {
    background: rgba(12, 135, 232, 0.1);
    border-color: rgba(12, 135, 232, 0.5);
  }
`;

const ScaleLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 0.5rem;
`;

const ScaleLabel = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  padding: 0 0.25rem;
`;

const Likert = ({ question, value = {}, onChange }) => {
  const handleSelect = (statementId, rating) => {
    onChange({
      ...value,
      [statementId]: rating
    });
  };
  
  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      
      <StatementsContainer>
        {question.statements.map((statement) => (
          <StatementCard key={statement.id}>
            <Statement>{statement.statement}</Statement>
            
            <ScaleLabels>
              {question.scale.map((label, index) => (
                <ScaleLabel key={index}>{label}</ScaleLabel>
              ))}
            </ScaleLabels>
            
            <ScaleContainer>
              {question.scale.map((label, index) => (
                <ScaleOption
                  key={index}
                  selected={value[statement.id] === index}
                  onClick={() => handleSelect(statement.id, index)}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </ScaleOption>
              ))}
            </ScaleContainer>
          </StatementCard>
        ))}
      </StatementsContainer>
    </div>
  );
};

export default Likert;