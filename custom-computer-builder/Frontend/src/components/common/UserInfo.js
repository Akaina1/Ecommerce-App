import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { loginUser } from '../API/userAPI'; 
import jwt_decode from 'jwt-decode';
import { handleLogout } from '../API/userAPI';

function UserInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // State to store the username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token.split(' ')[1]); // Parse the actual token from "Bearer <token>"
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp > currentTime) {
        setIsLoggedIn(true);
        setUsername(decoded.username);
      } else {
        // Token is expired, remove it
        localStorage.removeItem('token');
      }
    }
  }, []); // Empty dependency array means this useEffect runs once when the component mounts
 
  // Function to log in the user
  async function handleLogin() {
    const result = await loginUser(email, password);
    if (result.success) {
      setIsLoggedIn(true);
  
      // Decode the JWT to get the username
      const decoded = jwt_decode(result.token);
      setUsername(decoded.username);  // Set the username in your React state
    } else {
      console.error(result.message);
    }
  }

  // Function to log out the user
  const onLogout = () => handleLogout(setIsLoggedIn, setUsername);

  return (
    <div className="user-info-container">
      {isLoggedIn ? (
        // If logged in, display username and other user options
        <div>
          <h3>Welcome, {username}</h3> {/* Display the username */}
          <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
          <Button variant="contained" color="primary" href="/user-dashboard">User Dashboard</Button>
        </div>
      ) : (
        // If not logged in, display the login form
        <div className='login-form'>
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
          <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;