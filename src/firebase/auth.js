import { 
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, sendPasswordResetEmail, updateProfile 
  } from 'firebase/auth';
  import { auth } from './config';
  
  // Sign in with email and password
  export const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  
  // Create a new user with email and password
  export const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      return userCredential.user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };
  
  // Sign out
  export const logOut = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };
  
  // Send password reset email
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };
  
  // Update user profile
  export const updateUserProfile = async (user, profileData) => {
    try {
      await updateProfile(user, profileData);
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };