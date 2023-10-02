import React from 'react';
import { Container, Grid } from '@mui/material';
import LandingLeftContent from '../layout/LandingLeftContent';
import LandingCentralContent from '../layout/LandingCentralContent';
import LandingRightContent from '../layout/LandingRightContent';

function LandingPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={3} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <LandingLeftContent>
            <h1>On Sale!</h1>

          </LandingLeftContent>
        </Grid>

        {/* Central Content */}
        <Grid item xs={8}>
          <LandingCentralContent>

          </LandingCentralContent>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={2}>
          <LandingRightContent>
            <h1>Right Sidebar</h1>

          </LandingRightContent>
        </Grid>
      </Grid>
    </Container>
  );
}


export default LandingPage;