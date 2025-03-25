import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import GradientBackground from '../animations/GradientBackground';
import FloatingElements from '../animations/FloatingElements';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 80px;
  padding: 2rem;
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      {/* Remove this line: */}
      {/* <AnimatedCursor /> */}
      <GradientBackground />
      <FloatingElements />
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;