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

const ScenarioContainer = styled.div`
  margin-bottom: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ScenarioText = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: white;
`;

const EmotionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const EmotionButton = styled(motion.button)`
  padding: 1rem;
  background: ${props => props.selected ? 
    'linear-gradient(135deg, rgba(12, 135, 232, 0.3), rgba(215, 18, 255, 0.3))' : 
    'rgba(255, 255, 255, 0.05)'
  };
  color: white;
  border: 1px solid ${props => props.selected ? '#d712ff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(12, 135, 232, 0.2), rgba(215, 18, 255, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const QuestionLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
`;

const EmotionalResponse = ({ question, value = {}, onChange }) => {
  const handleEmotionSelect = (scenarioId, emotion) => {
    onChange({
      ...value,
      [scenarioId]: emotion
    });
  };
  
  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      
      {question.scenarios.map((scenario) => (
        <ScenarioContainer key={scenario.id}>
          <ScenarioText>{scenario.scenario}</ScenarioText>
          <QuestionLabel>How would this make you feel?</QuestionLabel>
          
          <EmotionsGrid>
            {scenario.emotions.map((emotion, index) => (
              <EmotionButton
                key={index}
                selected={value[scenario.id] === emotion}
                onClick={() => handleEmotionSelect(scenario.id, emotion)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -4 }}
              >
                {emotion}
              </EmotionButton>
            ))}
          </EmotionsGrid>
        </ScenarioContainer>
      ))}
    </div>
  );
};

export default EmotionalResponse;