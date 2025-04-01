import React, { createContext, useState } from 'react';
import { saveSurveyResponse } from '../firebase/firestore';

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyId, setSurveyId] = useState(null);

  // Update responses for a specific question
  const updateResponse = (questionId, answer) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  // Go to next step
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  // Go to previous step
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Go to specific step
  const goToStep = (step) => {
    setCurrentStep(step);
  };
  
  // Submit all responses
  const submitSurvey = async (additionalData = {}) => {
    try {
      setIsSubmitting(true);
      
      const surveyData = {
        ...responses,
        ...additionalData,
        completedAt: new Date().toISOString(),
      };
      
      const id = await saveSurveyResponse(surveyData);
      setSurveyId(id);
      setIsCompleted(true);
      
      return id;
    } catch (error) {
      console.error("Error submitting survey:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the survey
  const resetSurvey = () => {
    setCurrentStep(0);
    setResponses({});
    setIsCompleted(false);
    setSurveyId(null);
  };
  
  const value = {
    currentStep,
    responses,
    isSubmitting,
    isCompleted,
    surveyId,
    updateResponse,
    nextStep,
    prevStep,
    goToStep,
    submitSurvey,
    resetSurvey
  };
  
  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};