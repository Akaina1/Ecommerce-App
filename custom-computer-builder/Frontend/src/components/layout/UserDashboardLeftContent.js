import React from 'react';
import { Container } from '@mui/material';

function UserDashboardLeftContent({ children }) {
  
  return (
    <Container maxWidth={false} className="user-dashboard-left-content">
      {children}
      
    </Container>
  );
}

export default UserDashboardLeftContent;