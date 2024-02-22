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
  const storedToken = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [username, setUsername] = useState(storedUsername || '');

  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsLoggedIn(true);
        setUsername(result.username);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
      } else {
        setIsLoggedIn(false);
        console.error(result.message);
      }
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoggedIn(false);
      return { success: false, message: 'Something went wrong' };
    }
  };

  const handleUserLogout = () => {
    handleLogout(setIsLoggedIn, setUsername);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  // Check for stored token and username on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!storedToken);
    setUsername(storedUsername || '');
  }, []);

  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    onLogin: handleLogin,
    onLogout: handleUserLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};