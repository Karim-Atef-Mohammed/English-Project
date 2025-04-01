import styled from 'styled-components';
import { motion } from 'framer-motion';

// Use $variant instead of variant
const StyledButton = styled(motion.button)`
  background: ${props => props.$variant === 'primary' 
    ? 'linear-gradient(90deg, #0c87e8, #d712ff)' 
    : 'transparent'};
  border: 1px solid ${props => props.$variant === 'primary' 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: ${props => props.$disabled ? 0.6 : 0.9};
  }
`;

const Button = ({ children, variant = 'primary', disabled = false, onClick }) => {
  return (
    <StyledButton
      $variant={variant}
      $disabled={disabled}
      disabled={disabled} // This is a valid HTML attribute so it's okay
      onClick={onClick}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </StyledButton>
  );
};

export default Button;