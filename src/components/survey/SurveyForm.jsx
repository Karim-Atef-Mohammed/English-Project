import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useSurvey } from '../../hooks/useSurvey';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import questions from '../../data/questions';

// Question Components
import MultipleChoice from './questions/MultipleChoice';
import Likert from './questions/Likert';
import ColorSelector from './questions/ColorSelector';
import BrandComparison from './questions/BrandComparison';
import EmotionalResponse from './questions/EmotionalResponse';
import SurveyCompletion from './SurveyCompletion';
import Information from './questions/Information';
import OpenEndedQuestions from './questions/OpenEndedQuestions';

const SurveyContainer = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  
`;

const QuestionContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
`;

const SurveyForm = () => {
  const { 
    currentStep, 
    responses, 
    isSubmitting,
    isCompleted,
    updateResponse,
    nextStep,
    prevStep,
    submitSurvey
  } = useSurvey();
  
  if (isCompleted) {
    return <SurveyCompletion />;
  }
  
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  
  const handleUpdateResponse = (answer) => {
    updateResponse(currentQuestion.id, answer);
  };
  
  const handleNext = () => {
    if (isLastStep) {
      submitSurvey();
    } else {
      nextStep();
      // Scroll to top when navigating to next question
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevious = () => {
    prevStep();
    // Scroll to top when navigating to previous question
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const isQuestionAnswered = () => {
    // Information type questions don't require an answer
    if (currentQuestion?.type === 'information') return true;
    
    const currentAnswers = responses[currentQuestion?.id];
    if (!currentAnswers) return false;
    
    switch (currentQuestion?.type) {
      case 'multipleChoice':
        return currentQuestion.questions.every(q => {
          if (q.freeText) {
            return currentAnswers[q.id] && currentAnswers[q.id].trim() !== '';
          }
          return currentAnswers[q.id] !== undefined;
        });
        
      case 'likert':
        return currentQuestion.statements.every(s => 
          currentAnswers[s.id] !== undefined
        );
        
      case 'colorSelector':
        return currentQuestion.colorQuestions.every(q => 
          currentAnswers[q.id] && currentAnswers[q.id].length > 0
        );
        
      case 'brandComparison':
        // Handle the new brand comparison format with statements
        if (currentQuestion.brandPairs && currentQuestion.brandPairs[0]?.statements) {
          let allAnswered = true;
          for (const brand of currentQuestion.brandPairs) {
            if (brand.statements) {
              for (let i = 0; i < brand.statements.length; i++) {
                if (currentAnswers[`${brand.id}_a_${i}`] === undefined || 
                    currentAnswers[`${brand.id}_b_${i}`] === undefined) {
                  allAnswered = false;
                  break;
                }
              }
            }
            if (!allAnswered) break;
          }
          return allAnswered;
        } else {
          // Original format
          return currentQuestion.brandPairs.every(brand => 
            brand.questions.every((_, i) => 
              currentAnswers[`${brand.id}_${i}`] !== undefined
            )
          );
        }
        
      case 'emotionalResponse':
        return currentQuestion.scenarios.every(s => 
          currentAnswers[s.id] !== undefined
        );
        
      case 'openEndedQuestions':
        return currentQuestion.questions.every(q => 
          currentAnswers[q.id] && currentAnswers[q.id].trim() !== ''
        );
        
      default:
        return false;
    }
  };
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
  
    const props = {
      question: currentQuestion,
      value: responses[currentQuestion.id] || {},
      onChange: handleUpdateResponse
    };
    
    switch (currentQuestion.type) {
      case 'multipleChoice':
        return <MultipleChoice {...props} />;
      case 'likert':
        return <Likert {...props} />;
      case 'colorSelector':
        return <ColorSelector {...props} />;
      case 'brandComparison':
        return <BrandComparison {...props} />;
      case 'emotionalResponse':
        return <EmotionalResponse {...props} />;
      case 'information':
        return <Information {...props} />;
      case 'openEndedQuestions':
        return <OpenEndedQuestions {...props} />;
      default:
        return <div>Unknown question type</div>;
    }
  };
  
  // Create step titles for progress bar
  const stepTitles = questions.map(q => q.shortTitle || q.title.substring(0, 15) + '...');
  
  const isNextDisabled = !isQuestionAnswered();
  
  return (
    <SurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProgressBar 
        current={currentStep + 1} 
        total={questions.length} 
        steps={stepTitles}
      />
      
      <AnimatePresence mode="wait">
        <QuestionContainer
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {renderQuestion()}
          
          {isNextDisabled && currentQuestion?.type !== 'information' && (
            <ErrorMessage>
              Please answer all questions to continue.
            </ErrorMessage>
          )}
        </QuestionContainer>
      </AnimatePresence>
      
      <NavigationContainer>
        <Button 
          variant="secondary" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <Button 
          variant="primary"
          onClick={handleNext}
          disabled={isNextDisabled || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit Survey' : 'Next Question'}
        </Button>
      </NavigationContainer>
    </SurveyContainer>
  );
};

export default SurveyForm;