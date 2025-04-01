import styled from 'styled-components';
import { motion } from 'framer-motion';

// BEFORE:
// const NavButton = styled(motion.button)`
//   background: ${props => props.active ? 'rgba(12, 135, 232, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
//   /* other styling */
// `;

// AFTER: Use $active instead of active
const NavButton = styled(motion.button)`
  background: ${props => props.$active ? 'rgba(12, 135, 232, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$active ? '#0c87e8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(12, 135, 232, 0.1);
  }
`;

const AdminNavButton = ({ icon, label, isActive, onClick }) => {
  return (
    <NavButton
      $active={isActive} // Use $active instead of active
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </NavButton>
  );
};

export default AdminNavButton;