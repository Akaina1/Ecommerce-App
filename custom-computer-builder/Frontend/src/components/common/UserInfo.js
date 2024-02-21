import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import jwt_decode from 'jwt-decode'; // Import jwt_decode
import { useAuth } from './AuthenticationProvider';
import NavButton from '../common/NavButton';


function UserInfo() {
  const { isLoggedIn, setIsLoggedIn, setUsername, username, onLogin, onLogout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token.split(' ')[1]);
      const currentTime = Date.now() / 1000;
  
      if (decoded.exp > currentTime) {
        // Token is still valid, set the login state
        setIsLoggedIn(true);
        setUsername(decoded.username);
      } else {
        // Token is expired, remove it and set the login state
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
      }
    }
  }, []);

  const handleLogin = async () => {
    await onLogin(email, password);
    // refresh page
    window.location.reload();
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="user-info-container">
      {isLoggedIn ? (
        <div className='login-container'>
          <h3>Welcome, {username}</h3>
          <Button className='logout-Button' variant="contained" color="logout" onClick={handleLogout}>
            Logout
          </Button>
          <NavButton label="User Dashboard" path="/user-dashboard" />
        </div>
      ) : (
        <div className="login-form">
          <TextField 
            label="Email"  
            variant="outlined" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="button" onClick={handleLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;