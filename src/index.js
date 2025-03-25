import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SurveyProvider } from './context/SurveyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SurveyProvider>
        <App />
      </SurveyProvider>
    </AuthProvider>
  </React.StrictMode>
);