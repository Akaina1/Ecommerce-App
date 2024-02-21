import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, handleLogout } from '../API/userAPI';

// Create a context to manage authentication state and functions
const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication provider component
export const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Function to handle user login
    const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsLoggedIn(true);  // Set isLoggedIn to true when login is successful
        setUsername(result.username);
      } else {
        setIsLoggedIn(false);  // Set isLoggedIn to false when login fails
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoggedIn(false);  // Set isLoggedIn to false in case of an error
      return { success: false, message: 'Something went wrong' };
    }
  };

  // Function to handle user logout
  const handleUserLogout = () => {
    handleLogout(setIsLoggedIn, setUsername);
  };

  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn, // Add this line
    username,
    setUsername, // Add this line
    onLogin: handleLogin,
    onLogout: handleUserLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};