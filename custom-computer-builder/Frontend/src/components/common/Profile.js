// Import necessary modules and styles
import '../SASS/Profile.scss';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../common/AuthenticationProvider';
import { Container, Typography } from '@mui/material';
import { getUserById } from '../API/userAPI';  


function Profile() {
  const { username, userId } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (userId && storedToken) {
          const result = await getUserById(userId, storedToken);

          if (result.success) {
            setEmail(result.userInfo.email);
          } else {
            console.error(result.message);
          }
        }
      } catch (error) {
        console.error('Error during getUserById:', error);
      }
    };


    fetchUserInfo();
  }, [userId]); 

  return (
    <Container maxWidth="md" className="profile-container">
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
      {/* Adding the Password section eventually */}
    </Container>
  );
}

export default Profile;