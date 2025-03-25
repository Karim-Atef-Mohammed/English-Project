import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { HexColorPicker } from 'react-colorful';

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

const ColorQuestion = styled.div`
  margin-bottom: 2.5rem;
`;

const SubQuestion = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const Instruction = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const ColorOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ColorButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 3px solid ${props => props.selected ? 'white' : 'transparent'};
  box-shadow: ${props => props.selected ? '0 0 0 2px #0c87e8' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SelectedColors = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const SelectedColor = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  position: relative;
  
  &::after {
    content: '×';
    position: absolute;
    top: -8px;
    right: -8px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
  }
`;

const CustomColorSection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CustomColorTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

// Predefined color palette
const colorPalette = [
  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#5AC8FA',
  '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E',
  '#8E8E93', '#FFFFFF', '#000000', '#E5E5EA', '#1C1C1E'
];

const ColorSelector = ({ question, value = {}, onChange }) => {
  const [customColor, setCustomColor] = React.useState('#0c87e8');
  
  const handleColorSelect = (questionId, color) => {
    const currentColors = value[questionId] || [];
    
    // If already selected, remove it
    if (currentColors.includes(color)) {
      onChange({
        ...value,
        [questionId]: currentColors.filter(c => c !== color)
      });
      return;
    }
    
    // Add color, but limit to 3 selections
    if (currentColors.length < 3) {
      onChange({
        ...value,
        [questionId]: [...currentColors, color]
      });
    }
  };
  
  const handleRemoveColor = (questionId, colorToRemove) => {
    const currentColors = value[questionId] || [];
    onChange({
      ...value,
      [questionId]: currentColors.filter(color => color !== colorToRemove)
    });
  };
  
  const handleAddCustomColor = (questionId) => {
    handleColorSelect(questionId, customColor);
  };
  
  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      
      {question.colorQuestions.map((colorQuestion) => (
        <ColorQuestion key={colorQuestion.id}>
          <SubQuestion>{colorQuestion.question}</SubQuestion>
          <Instruction>{colorQuestion.instruction}</Instruction>
          
          <ColorOptions>
            {colorPalette.map((color, index) => (
              <ColorButton
                key={index}
                color={color}
                selected={(value[colorQuestion.id] || []).includes(color)}
                onClick={() => handleColorSelect(colorQuestion.id, color)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -5 }}
              />
            ))}
          </ColorOptions>
          
          {(value[colorQuestion.id]?.length > 0) && (
            <SelectedColors>
              {value[colorQuestion.id].map((color, index) => (
                <SelectedColor
                  key={index}
                  color={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => handleRemoveColor(colorQuestion.id, color)}
                />
              ))}
            </SelectedColors>
          )}
          
          <CustomColorSection>
            <CustomColorTitle>Can't find your color? Choose a custom one:</CustomColorTitle>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <HexColorPicker color={customColor} onChange={setCustomColor} style={{ maxWidth: '300px' }} />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddCustomColor(colorQuestion.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                disabled={(value[colorQuestion.id] || []).length >= 3}
              >
                <span style={{ 
                  display: 'inline-block', 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: customColor,
                  borderRadius: '50%',
                  marginRight: '8px'
                }}></span>
                Add Custom Color
              </motion.button>
            </div>
          </CustomColorSection>
        </ColorQuestion>
      ))}
    </div>
  );
};

export default ColorSelector;