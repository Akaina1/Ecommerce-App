import React from 'react';
import { Container, Grid } from '@mui/material';
import UserDashboardCentralContent from '../layout/UserDashboardCentralContent';
import UserDashboardLeftContent from '../layout/UserDashboardLeftContent';

function UserDashboard({ onSelect, selectedOption }) {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2}>
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <UserDashboardLeftContent onSelect={onSelect} />
        </Grid>

        {/* Central Content */}
        <Grid item xs={10}>
          <UserDashboardCentralContent selectedOption={selectedOption} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDashboard;