import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

// Change it to:
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  transition: background 0.3s ease;
  backdrop-filter: ${props => props["data-scrolled"] === "true" ? 'blur(10px)' : 'none'};
  background: ${props => props["data-scrolled"] === "true" ? 'rgba(15, 15, 22, 0.9)' : 'transparent'};
  border-bottom: ${props => props["data-scrolled"] === "true" ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0c87e8, #d712ff);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 20px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #0c87e8, #d712ff);
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 0;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
`;

const MenuBar = styled(motion.div)`
  width: 24px;
  height: 2px;
  background-color: white;
  border-radius: 2px;
`;

const MobileMenu = styled(motion.div)`
  position: relative; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 22, 0.98);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #0c87e8, #d712ff);
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  useEffect(() => {
    // Close mobile menu when route changes
    closeMobileMenu();
  }, [location.pathname]);
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  return (
    // And change it to:
    <HeaderContainer 
      data-scrolled={(scrolled || mobileMenuOpen).toString()}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>C</LogoIcon>
          Chromatic
        </Logo>
        
        <Nav>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavLink>
          <NavLink to="/survey" className={location.pathname === '/survey' ? 'active' : ''}>
            Survey
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
              Admin Dashboard
            </NavLink>
          )}
        </Nav>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuBar 
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <MenuBar 
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <MenuBar 
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </MobileMenuButton>
      </HeaderContent>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </MobileNavLink>
            <MobileNavLink to="/survey" className={location.pathname === '/survey' ? 'active' : ''}>
              Survey
            </MobileNavLink>
            {isAdmin && (
              <MobileNavLink to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
              Admin Dashboard
              </MobileNavLink>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
