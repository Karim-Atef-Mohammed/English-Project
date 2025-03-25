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

const BrandCard = styled.div`
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const BrandHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const BrandName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const BrandType = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const BrandComparison = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const BrandVersion = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const BrandImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const BrandLogoPlaceholder = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const VersionLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const VSCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin: 1rem 0;
  
  @media (min-width: 768px) {
    margin: 0;
  }
`;

const StatementsContainer = styled.div`
  margin-top: 2rem;
`;

const StatementSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: white;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatementItem = styled.div`
  margin-bottom: 1.2rem;
`;

const StatementText = styled.p`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

const RatingButton = styled(motion.button)`
  flex: 1;
  min-width: 40px;
  padding: 0.5rem;
  background: ${props => props.selected ? 'rgba(12, 135, 232, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  color: white;
  border: 1px solid ${props => props.selected ? '#0c87e8' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(12, 135, 232, 0.1);
    border-color: rgba(12, 135, 232, 0.3);
  }
`;

const RatingScale = ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree'];

const BrandComparisonComponent = ({ question, value = {}, onChange }) => {
  const handleRatingSelect = (brandId, version, statementIndex, rating) => {
    const key = `${brandId}_${version}_${statementIndex}`;
    onChange({
      ...value,
      [key]: rating
    });
  };
  
  return (
    <div>
      <QuestionTitle>{question.title}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      
      {question.brandPairs.map((brand) => (
        <BrandCard key={brand.id}>
          <BrandHeader>
            <BrandName>{brand.brandName}</BrandName>
            <BrandType>{brand.brandType}</BrandType>
          </BrandHeader>
          
          <BrandComparison>
            <BrandVersion>
              {brand.originalImageUrl ? (
                <BrandImage>
                  <img src={brand.originalImageUrl} alt={`${brand.brandName} Version A`} />
                </BrandImage>
              ) : (
                <BrandLogoPlaceholder color={brand.originalColor}>
                  {brand.versionA || "Version A"}
                </BrandLogoPlaceholder>
              )}
              <VersionLabel>Version A: {brand.versionA || "Original"}</VersionLabel>
            </BrandVersion>
            
            <VSCircle>VS</VSCircle>
            
            <BrandVersion>
              {brand.newImageUrl ? (
                <BrandImage>
                  <img src={brand.newImageUrl} alt={`${brand.brandName} Version B`} />
                </BrandImage>
              ) : (
                <BrandLogoPlaceholder color={brand.newColor}>
                  {brand.versionB || "Version B"}
                </BrandLogoPlaceholder>
              )}
              <VersionLabel>Version B: {brand.versionB || "New"}</VersionLabel>
            </BrandVersion>
          </BrandComparison>
          
          <StatementsContainer>
            <StatementSection>
              <SectionTitle>For {brand.brandName} Version A</SectionTitle>
              {brand.statements.map((statement, index) => (
                <StatementItem key={`${brand.id}_a_${index}`}>
                  <StatementText>{statement}</StatementText>
                  <RatingContainer>
                    {RatingScale.map((label, ratingValue) => (
                      <RatingButton
                        key={ratingValue}
                        selected={value[`${brand.id}_a_${index}`] === ratingValue}
                        onClick={() => handleRatingSelect(brand.id, 'a', index, ratingValue)}
                        whileTap={{ scale: 0.97 }}
                        title={label}
                      >
                        {ratingValue + 1}
                      </RatingButton>
                    ))}
                  </RatingContainer>
                </StatementItem>
              ))}
            </StatementSection>
            
            <StatementSection>
              <SectionTitle>For {brand.brandName} Version B</SectionTitle>
              {brand.statements.map((statement, index) => (
                <StatementItem key={`${brand.id}_b_${index}`}>
                  <StatementText>{statement}</StatementText>
                  <RatingContainer>
                    {RatingScale.map((label, ratingValue) => (
                      <RatingButton
                        key={ratingValue}
                        selected={value[`${brand.id}_b_${index}`] === ratingValue}
                        onClick={() => handleRatingSelect(brand.id, 'b', index, ratingValue)}
                        whileTap={{ scale: 0.97 }}
                        title={label}
                      >
                        {ratingValue + 1}
                      </RatingButton>
                    ))}
                  </RatingContainer>
                </StatementItem>
              ))}
            </StatementSection>
          </StatementsContainer>
        </BrandCard>
      ))}
    </div>
  );
};

export default BrandComparisonComponent;