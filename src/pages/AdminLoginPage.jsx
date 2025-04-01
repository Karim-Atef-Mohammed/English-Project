import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUser, signInWithEmail } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import PageTransition from '../components/animations/PageTransition';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0c87e8;
  }
`;

const Error = styled.p`
  color: #ff4d4d;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithEmail(email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);
    
  //   try {
  //     await createUser(email, password, 'Admin User');
  //     navigate('/admin');
  //   } catch (err) {
  //     console.error(err);
  //     setError('Registration failed. ' + err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // If already authenticated as admin, redirect to admin page
  if (isAdmin) {
    navigate('/admin');
    return null;
  }
  
  return (
    <PageTransition>
      <LoginContainer>
        <Title>Admin Access</Title>
        
        <form>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          {error && <Error>{error}</Error>}
          
          <ButtonGroup>
            <Button 
              type="button" 
              onClick={handleLogin}
              disabled={isLoading}
              style={{ flex: 1 }}
              
            >
              {isLoading ? 'Processing...' : 'Log In'}
            </Button>
            
            {/* <Button 
              type="button"
              variant="secondary"
              onClick={handleRegister}
              disabled={isLoading}
              style={{ flex: 1 }}
            >
              Register
            </Button> */}
          </ButtonGroup>
        </form>
      </LoginContainer>
    </PageTransition>
  );
};

export default AdminLoginPage;
