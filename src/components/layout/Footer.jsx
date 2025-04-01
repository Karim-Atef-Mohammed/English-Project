import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  padding: 3rem 2rem;
  background: rgba(15, 15, 22, 0.5);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  color: white;
  margin-bottom: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #0c87e8, #d712ff);
    transform: translateY(-3px);
  }
`;

const BottomFooter = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const BottomLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">Chromatic Shift</FooterLogo>
          <FooterText>
            Exploring the psychovisual impact of color changes in brand identities through 
            comprehensive research and user insights.
          </FooterText>
          <SocialLinks>
            <SocialLink 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </SocialLink>
            <SocialLink 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </SocialLink>
            <SocialLink 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About the Study</FooterLink>
            <FooterLink to="/survey">Take the Survey</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Resources</FooterHeading>
          <FooterLinks>
            <FooterLink to="/about#methodology">Research Methodology</FooterLink>
            <FooterLink to="/about#literature">Literature Review</FooterLink>
            <FooterLink to="/about#findings">Key Findings</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
          <FooterText>
            Have questions about the research or want to collaborate?
          </FooterText>
          <FooterLinks>
            <FooterLink to="/about#contact">Contact the Researcher</FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <BottomFooter>
        <Copyright>© {new Date().getFullYear()} Chromatic Shift Study. All rights reserved. Developed by Karim3tef</Copyright>
        <BottomLinks>
          <BottomLink to="/privacy">Privacy Policy</BottomLink>
          <BottomLink to="/terms">Terms of Use</BottomLink>
        </BottomLinks>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;