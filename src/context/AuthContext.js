import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
        if (initializing) setInitializing(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
        if (initializing) setInitializing(false);
      }
    );

    // Clean up listener
    return () => unsubscribe();
  }, [initializing]);

  const value = {
    user,
    loading,
    initializing,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.email === "admin@master.results.com",
  };



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
