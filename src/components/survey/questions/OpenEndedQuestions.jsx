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

const QuestionContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const QuestionText = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
  line-height: 1.5;
`;

const TextAreaWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0c87e8;
    box-shadow: 0 0 0 2px rgba(12, 135, 232, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const OpenEndedQuestions = ({ question, value = {}, onChange }) => {
  const handleInputChange = (questionId, text) => {
    onChange({
      ...value,
      [questionId]: text
    });
  };

  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      
      {question.questions.map((q) => (
        <QuestionContainer key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          <TextAreaWrapper>
            <StyledTextArea
              value={value[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              placeholder="Type your answer here..."
            />
          </TextAreaWrapper>
        </QuestionContainer>
      ))}
    </div>
  );
};

export default OpenEndedQuestions;