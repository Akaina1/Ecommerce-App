import React from 'react';
import { Container, Grid } from '@mui/material';
import LeftContent from '../layout/LeftContent';
import CentralContent from '../layout/CentralContent';
import RightContent from '../layout/RightContent';

function LandingPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={3} >
        {/* Left Sidebar */}
        <Grid item xs={3}>
          <LeftContent>
            <h1>Left Sidebar</h1>
            {/* Your left sidebar content here */}
          </LeftContent>
        </Grid>

        {/* Central Content */}
        <Grid item xs={6}>
          <CentralContent>
            <h1>Central Content</h1>
            {/* Your main content here */}
          </CentralContent>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={3}>
          <RightContent>
            <h1>Right Sidebar</h1>
            {/* Your right sidebar content here */}
          </RightContent>
        </Grid>
      </Grid>
    </Container>
  );
}


export default LandingPage;