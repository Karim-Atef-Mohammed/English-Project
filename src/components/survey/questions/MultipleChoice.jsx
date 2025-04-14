import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  margin-bottom: 2.5rem;
`;

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

const Question = styled.div`
  margin-bottom: 2rem;
`;

const QuestionText = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionButton = styled(motion.button)`
  padding: 1rem;
  background: ${props => props.selected ? 'rgba(12, 135, 232, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.selected ? '#0c87e8' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  color: white;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(12, 135, 232, 0.1);
    border-color: rgba(12, 135, 232, 0.3);
  }

    display: flex;
  align-items: center;
  
  .checkbox, .radio {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 10px;
    text-align: center;
    line-height: 18px;
  }
  
  .checkbox {
    border-radius: 3px;
  }
  
  .radio {
    border-radius: 50%;
  }
`;

const TextInputContainer = styled.div`
  margin-top: 1rem;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0c87e8;
    box-shadow: 0 0 0 2px rgba(12, 135, 232, 0.3);
  }
`;

const ErrorMessage = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: #ff6b6b;
`;



const MultipleChoice = ({ question, value = {}, onChange }) => {
  // Safety check - if question is undefined or malformed
  if (!question) {
    console.error("MultipleChoice received undefined question");
    return <ErrorMessage>Error loading question. Please refresh the page.</ErrorMessage>;
  }
  
  const handleOptionSelect = (questionId, selectedOption) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question.multiSelect) {
      // For multi-select questions, maintain an array of selections
      const currentSelections = Array.isArray(value[questionId]) ? value[questionId] : [];
      
      // Check if option is already selected
      const isSelected = currentSelections.includes(selectedOption);
      
      // Toggle selection
      const newSelections = isSelected
        ? currentSelections.filter(option => option !== selectedOption)
        : [...currentSelections, selectedOption];
      
      onChange({
        ...value,
        [questionId]: newSelections
      });
    } else {
      // For single-select questions, keep the current behavior
      onChange({
        ...value,
        [questionId]: selectedOption
      });
    }
  };
  
  const handleTextInput = (questionId, text) => {
    onChange({
      ...value,
      [questionId]: text
    });
  };
  
  // Ensure questions array exists
  const questions = question.questions || [];

  return (
    <QuestionContainer>
      <QuestionTitle>{question.title || "Questions"}</QuestionTitle>
      
      {question.description && (
        <QuestionDescription>{question.description}</QuestionDescription>
      )}
      
      {questions.length === 0 ? (
        <ErrorMessage>
          No questions found in this section. This may be a configuration error.
        </ErrorMessage>
      ) : (
        questions.map((q) => (
          <Question key={q.id}>
            <QuestionText>{q.question}</QuestionText>
            {q.freeText ? (
              <TextInputContainer>
                <TextInput 
                  type="text"
                  value={value[q.id] || ''}
                  onChange={(e) => handleTextInput(q.id, e.target.value)}
                  placeholder="Enter your response"
                />
              </TextInputContainer>
            ) : (
              <OptionsContainer>
                {/* Safety check for options */}
                {Array.isArray(q.options) ? (
                  q.options.map((option, index) => (
                    <OptionButton
                    key={index}
                    selected={question.multiSelect 
                      ? (Array.isArray(value[q.id]) && value[q.id].includes(option))
                      : value[q.id] === option
                    }
                    onClick={() => handleOptionSelect(q.id, option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={question.multiSelect ? "checkbox" : "radio"}>
                      {question.multiSelect 
                        ? (Array.isArray(value[q.id]) && value[q.id].includes(option) ? "✓" : "")
                        : (value[q.id] === option ? "•" : "")
                      }
                    </div>
                    {option}
                  </OptionButton>
                  ))
                ) : (
                  <ErrorMessage>No options available for this question</ErrorMessage>
                )}
              </OptionsContainer>
            )}
          </Question>
        ))
      )}
    </QuestionContainer>
  );
};

export default MultipleChoice;