// AuthenticationProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, handleLogout } from '../API/userAPI';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthenticationProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  const storedUserId = localStorage.getItem('userId');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [username, setUsername] = useState(storedUsername || '');
  const [userId, setUserId] = useState(storedUserId || ''); // Add userId state

  const handleLogin = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsLoggedIn(true);
        setUsername(result.username);
        setUserId(result.userId); // Set userId state
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        localStorage.setItem('userId', result.userId); // Store userId in localStorage
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
    localStorage.removeItem('userId'); // Remove userId on logout
  };

  // Check for stored token, username, and userId on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    setIsLoggedIn(!!storedToken);
    setUsername(storedUsername || '');
    setUserId(storedUserId || ''); // Set userId state on initial load
  }, []);

  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    userId,
    setUserId,
    onLogin: handleLogin,
    onLogout: handleUserLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};