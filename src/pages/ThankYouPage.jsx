import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useSurvey } from '../hooks/useSurvey';
import Button from '../components/ui/Button';
import PageTransition from '../components/animations/PageTransition';

const ThankYouContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ThankYouCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #0c87e8, #d712ff);
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 60px;
    height: 60px;
    color: white;
  }
`;

const ThankYouTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ThankYouText = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const SocialShareText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 2rem 0 1rem;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialButton = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, #0c87e8, #d712ff);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ThankYouPage = () => {
  const { resetSurvey } = useSurvey();
  
  useEffect(() => {
    // Reset the survey when user navigates away
    return () => {
      resetSurvey();
    };
  }, [resetSurvey]);
  
  const shareURL = window.location.origin;
  const shareText = "I just completed the Chromatic Shift brand color perception survey about Vodafone and WE! Check it out:";
    
  const handleShare = (platform) => {
    let shareUrl;
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareURL)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`;
        break;
      default:
        shareUrl = '';
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <PageTransition>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        colors={['#0c87e8', '#d712ff', '#10bfe5', '#ffffff']}
      />
      
      <ThankYouContainer>
        <ThankYouCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconWrapper
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
            </svg>
          </IconWrapper>
          
          <ThankYouTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Thank You!
          </ThankYouTitle>
          
          <ThankYouText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Your responses have been successfully recorded. Your participation is invaluable
            to our research on how color changes affect brand perception. The insights gathered
            will help brands make more informed decisions about their visual identities.
          </ThankYouText>
          
          <SocialShareText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Help us reach more participants by sharing this survey:
          </SocialShareText>
          
          <SocialButtons>
            <SocialButton 
              onClick={() => handleShare('twitter')}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </SocialButton>
            
            <SocialButton 
              onClick={() => handleShare('facebook')}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </SocialButton>
            
            <SocialButton 
              onClick={() => handleShare('linkedin')}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </SocialButton>
          </SocialButtons>
          
          <ButtonGroup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <Link to="/">
              <Button variant="secondary">Return Home</Button>
            </Link>
            <Link to="/about">
              <Button>Learn About the Research</Button>
            </Link>
          </ButtonGroup>
        </ThankYouCard>
      </ThankYouContainer>
    </PageTransition>
  );
};

export default ThankYouPage;