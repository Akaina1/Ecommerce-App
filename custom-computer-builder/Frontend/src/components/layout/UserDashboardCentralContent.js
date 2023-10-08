import React from 'react';
import { Container } from '@mui/material';

function UserDashboardCentralContent({ children }) {
  return (
    <Container maxWidth={false} className="user-dashboard-central-content">
      {children} 
    </Container>
  );
}

export default UserDashboardCentralContent;