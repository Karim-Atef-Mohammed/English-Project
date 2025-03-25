import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import SurveyForm from '../components/survey/SurveyForm';

const SurveyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SurveyPage = () => {
  return (
    <PageTransition>
      <SurveyContainer>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chromatic Shift Survey
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Share your perceptions about how color changes affect your view of brands.
            This survey takes approximately 10-15 minutes to complete.
          </PageDescription>
        </PageHeader>
        
        <SurveyForm />
      </SurveyContainer>
    </PageTransition>
  );
};

export default SurveyPage;