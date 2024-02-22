import '../SASS/Profile.scss'; // Import the SASS file
import React, { useEffect, useState } from 'react';
import { useAuth } from '../common/AuthenticationProvider';
import { Container, Typography, Button } from '@mui/material';
import { getUserById } from '../API/userAPI';  // Import the getUserById function


function Profile() {
    const { isLoggedIn, username, onLogout, userId, token } = useAuth(); // Include userId and token from the authentication context
    const [email, setEmail] = useState('');  // State to store user email

    useEffect(() => {
        // Fetch user information when userId and token are available
        const storedToken = localStorage.getItem('token');
        if (isLoggedIn && userId && storedToken) {
          getUserById(userId, storedToken) // Use storedToken directly
            .then((result) => {
              if (result.success) {
                // Set the email in state
                setEmail(result.userInfo.email);
              } else {
                console.error(result.message);
              }
            })
            .catch((error) => {
              console.error('Error during getUserById:', error);
            });
        }
      }, [isLoggedIn, userId]); // Removed 'token' from dependencies
  
       return (
        <Container maxWidth="md" className="profile-container">
        {isLoggedIn ? (
            <>
            <Typography variant="h4" className="profile-header">
                Your Account Information
            </Typography>
            <div className="profile-info">
                <Typography variant="body1" className="profile-label">
                Username:
                </Typography>
                <Typography variant="body1" className="profile-text">
                {username}
                </Typography>
            </div>
            <div className="profile-info">
                <Typography variant="body1" className="profile-label">
                Email:
                </Typography>
                <Typography variant="body1" className="profile-text">
                {email}
                </Typography>
            </div>
            {/* Add the Password section (input fields or whatever is needed) */}
            </>
        ) : (
            <Typography variant="body1" className="profile-text">
            Please log in to view your profile.
            </Typography>
        )}
        </Container>
    );
    }
  
  export default Profile;
  