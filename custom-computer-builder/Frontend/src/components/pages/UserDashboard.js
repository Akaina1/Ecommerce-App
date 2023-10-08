import React from 'react';
import { Container, Grid } from '@mui/material';
import UserDashboardCentralContent from '../layout/UserDashboardCentralContent';
import UserDashboardLeftContent from '../layout/UserDashboardLeftContent';

function UserDashboard() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <UserDashboardLeftContent>
            <h1>Left Sidebar</h1>
 
          </UserDashboardLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <UserDashboardCentralContent>
          <h1>User Dashboard</h1>
    
        </UserDashboardCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default UserDashboard;
