import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageTransition from '../components/animations/PageTransition';
import Button from '../components/ui/Button';

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const PageDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: white;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0c87e8, #d712ff);
  }
`;

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.8;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    color: white;
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }
  
  ul {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.75rem;
    }
  }
`;

const ResearcherCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ResearcherImage = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0c87e8, #d712ff);
  position: relative;
  overflow: hidden;
  align-self: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResearcherInfo = styled.div`
  flex: 1;
`;

const ResearcherName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const ResearcherTitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const ResearcherBio = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ContactSection = styled.div`
  margin-top: 5rem;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ContactText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const MethodologyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  
  h3 {
    margin-top: 0;
  }
`;

const AboutPage = () => {
  return (
    <PageTransition>
      <AboutContainer>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About the Study
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Exploring the perceptual and psychological impact of color changes in brand identities
            through comprehensive research and analysis.
          </PageDescription>
        </PageHeader>
        
        <Section id="overview">
          <SectionTitle
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Research Overview
          </SectionTitle>
          <SectionContent>
            <p>
              The "Chromatic Shift in Brand Identity" research project investigates the complex relationship 
              between color changes in brand identities and their impact on consumer perception, trust, and 
              emotional response. In today's visually saturated marketplace, brands frequently undergo color 
              transformations as part of rebranding initiatives or evolving market strategies.
            </p>
            <p>
              This study aims to quantify and analyze how these chromatic shifts influence consumer 
              perceptions across different demographics, industries, and cultural contexts. The findings 
              will provide valuable insights for marketers, designers, and brand strategists seeking to 
              optimize their visual identity decisions.
            </p>
            <p>
              Through a combination of survey data, visual experiments, and comparative analysis, we seek to 
              understand the psychological mechanisms that drive color-based brand perceptions and decision-making.
            </p>
          </SectionContent>
        </Section>
        
        <Section id="methodology">
          <SectionTitle
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Research Methodology
          </SectionTitle>
          <SectionContent>
            <p>
              Our research employs a mixed-methods approach combining quantitative survey data with 
              qualitative analysis to provide comprehensive insights into color perception in branding.
            </p>
            
            <MethodologyCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>Survey Design</h3>
              <p>
                The core of our research is a carefully designed survey that presents participants with 
                various brand scenarios and color variations. The survey includes multiple question types:
              </p>
              <ul>
                <li><strong>Demographic questions</strong> to analyze response variations across different groups</li>
                <li><strong>Color association tasks</strong> to establish baseline perceptions of different colors</li>
                <li><strong>Brand comparison exercises</strong> showing original vs. altered brand colors</li>
                <li><strong>Emotional response measurements</strong> to hypothetical brand color changes</li>
                <li><strong>Likert scale questions</strong> to quantify attitudes toward brand color consistency</li>
              </ul>
            </MethodologyCard>
            
            <MethodologyCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Data Analysis</h3>
              <p>
                Survey responses will be analyzed using statistical methods to identify patterns and correlations:
              </p>
              <ul>
                <li>Comparative analysis of original vs. changed color perceptions</li>
                <li>Cross-tabulation of demographic factors with color preferences</li>
                <li>Factor analysis to identify key dimensions of color perception</li>
                <li>Sentiment analysis of emotional responses to color changes</li>
              </ul>
            </MethodologyCard>
            
            <MethodologyCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Theoretical Framework</h3>
              <p>
                The research is grounded in established theories from color psychology, consumer behavior, 
                and visual perception, including:
              </p>
              <ul>
                <li>Color psychology and emotional associations</li>
                <li>Visual processing and attention theory</li>
                <li>Brand identity and recognition research</li>
                <li>Consumer trust formation models</li>
              </ul>
            </MethodologyCard>
          </SectionContent>
        </Section>
        
        <Section id="literature">
          <SectionTitle
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Literature Review
          </SectionTitle>
          <SectionContent>
            <p>
              Our research builds upon existing studies in color psychology, brand perception, and 
              consumer behavior. Key findings from previous research indicate that:
            </p>
            <ul>
              <li>
                Color influences up to 90% of initial product assessments, with consumers making 
                subconscious judgments within 90 seconds of viewing. (Singh, 2006)
              </li>
              <li>
                Brand recognition increases by up to 80% when consistent and strategic color palettes 
                are employed. (Wheeler, 2017)
              </li>
              <li>
                Different demographic groups show varied responses to colors, with cultural factors 
                significantly influencing color perception and meaning. (Akcay et al., 2011)
              </li>
              <li>
                Brand color changes can lead to significant shifts in consumer perception, either 
                reinforcing or disrupting established brand associations. (Labrecque & Milne, 2012)
              </li>
              <li>
                The relationship between color and emotion is complex, with context playing a crucial 
                role in how colors are perceived. (Elliot & Maier, 2014)
              </li>
            </ul>
            <p>
              While these studies provide valuable insights, there remains a gap in understanding the 
              specific impact of chromatic shifts in established brand identities across different industries 
              and demographic segments. Our research aims to address this gap.
            </p>
          </SectionContent>
        </Section>
        
        <Section id="researcher">
          <SectionTitle
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About the Researcher
          </SectionTitle>
          <SectionContent>
            <ResearcherCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ResearcherImage>
                {/* Placeholder for researcher image */}
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '3rem'
                }}>
                  KM
                </div>
              </ResearcherImage>
              <ResearcherInfo>
                <ResearcherName>Karim Atef, Ammar Khaled, Omar Sabry, Ahmed Adel</ResearcherName>
                <ResearcherTitle>Principal Investigators</ResearcherTitle>
                <ResearcherBio>
                  They are researchers with a background in visual perception, consumer psychology, and 
                  brand identity. With expertise in both quantitative and qualitative research methods, 
                  They have conducted several studies on the intersection of visual design and consumer behavior. 
                  This current project on chromatic shifts in brand identity represents the culmination of years 
                  of interest in how visual elements influence our perceptions and decisions.
                </ResearcherBio>
                <ResearcherBio>
                  Academic background includes specialized training in color theory, psychological assessment, 
                  and statistical analysis techniques. Previous research has been presented at conferences on 
                  marketing psychology and published in journals focused on consumer behavior.
                </ResearcherBio>
              </ResearcherInfo>
            </ResearcherCard>
          </SectionContent>
        </Section>
        
        <ContactSection id="contact">
          <ContactTitle>Participate in the Research</ContactTitle>
          <ContactText>
            Your participation in this survey will contribute valuable data to our understanding of how 
            color affects brand perception. The survey takes approximately 10-15 minutes to complete 
            and all responses are anonymous.
          </ContactText>
          <Link to="/survey">
            <Button size="lg">Take the Survey</Button>
          </Link>
        </ContactSection>
      </AboutContainer>
    </PageTransition>
  );
};

export default AboutPage;