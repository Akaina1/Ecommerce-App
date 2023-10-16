import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function UserInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mocking logged-in state
  
  return (
    <div className="user-info-container">
      {isLoggedIn ? (
        <div>
          <h3>User Details</h3>
          {/* Add links and other details here */}
        </div>
      ) : (
        <div className='login-form'>
          <TextField label="Username" variant="outlined" />
          <TextField label="Password" variant="outlined" type="password" />
          <Button variant="contained" color="primary">Login</Button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;