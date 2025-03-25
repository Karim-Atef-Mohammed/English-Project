import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  signInWithEmail, createUser, logOut, 
  resetPassword, updateUserProfile 
} from '../firebase/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, loading, initializing, error, isAuthenticated, isAdmin } = context;

  return {
    user,
    loading,
    initializing, 
    error,
    isAuthenticated,
    isAdmin,
    signIn: signInWithEmail,
    signUp: createUser,
    signOut: logOut,
    resetPassword,
    updateProfile: (profileData) => updateUserProfile(user, profileData),
  };
};