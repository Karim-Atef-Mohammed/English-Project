import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import PageTransition from '../components/animations/PageTransition';

const Hero = styled.section`
  height: calc(100vh - 160px);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 800px;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff, #0c87e8);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 8s linear infinite;
  
  @keyframes gradient {
    to {
      background-position: 200% center;
    }
  }
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Section = styled.section`
  padding: 6rem 2rem;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto 4rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(12, 135, 232, 0.1), rgba(215, 18, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    width: 30px;
    height: 30px;
    fill: url(#gradient);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const StatNumber = styled.h3`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const CTASection = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CTABackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(12, 135, 232, 0.1), rgba(215, 18, 255, 0.05), transparent);
  z-index: 0;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const CTADescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <PageTransition>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Chromatic Shift in Brand Identity
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A psychovisual study exploring how color changes in brand identities
            impact consumer perception, trust, and emotional response.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/survey">
              <Button size="lg">Take the Survey</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg">Learn More</Button>
            </Link>
          </HeroButtons>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Explore the Power of Color</SectionTitle>
        <SectionSubtitle>
          Discover how subtle shifts in color palettes can dramatically alter brand perception
          and consumer behavior.
        </SectionSubtitle>
        
        <FeaturesGrid>
          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FeatureIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0c87e8" />
                    <stop offset="100%" stopColor="#d712ff" />
                  </linearGradient>
                </defs>
                <path fill="url(#gradient1)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Color Psychology</FeatureTitle>
            <FeatureDescription>
              Explore how different colors evoke specific emotions and associations,
              affecting brand perception across different demographics and cultural contexts.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0c87e8" />
                    <stop offset="100%" stopColor="#d712ff" />
                  </linearGradient>
                </defs>
                <path fill="url(#gradient2)" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v6h6v-2h-4V8z"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Brand Evolution</FeatureTitle>
            <FeatureDescription>
              Understand how brands transition their color palettes over time to reflect
              changing market trends, company values, and consumer expectations.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FeatureIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0c87e8" />
                    <stop offset="100%" stopColor="#d712ff" />
                  </linearGradient>
                </defs>
                <path fill="url(#gradient3)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Consumer Trust</FeatureTitle>
            <FeatureDescription>
              Analyze how color changes can significantly impact consumer trust,
              brand recognition, and purchase intent across different industry sectors.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <StatsSection>
        <SectionTitle>Research Impact</SectionTitle>
        <SectionSubtitle>
          Our comprehensive study investigates the measurable effects of color in branding,
          providing valuable insights for designers and marketers.
        </SectionSubtitle>
        
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <StatNumber>85%</StatNumber>
            <StatLabel>of consumers cite color as primary reason for purchasing</StatLabel>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatNumber>90%</StatNumber>
            <StatLabel>of snap judgments about products are based on color</StatLabel>
          </StatCard>
          
          <StatCard
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatNumber>78%</StatNumber>
            <StatLabel>increase in brand recognition through consistent color</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <CTASection>
        <CTABackground />
        <CTAContent>
          <CTATitle>Participate in Our Study</CTATitle>
          <CTADescription>
            Share your perceptions and help advance our understanding of how color influences
            brand identity. Your input will contribute to valuable research in visual psychology
            and marketing science.
          </CTADescription>
          <Link to="/survey">
            <Button size="lg">Take the Survey Now</Button>
          </Link>
        </CTAContent>
      </CTASection>
      
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c87e8" />
            <stop offset="100%" stopColor="#d712ff" />
          </linearGradient>
        </defs>
      </svg>
    </PageTransition>
  );
};

export default HomePage;