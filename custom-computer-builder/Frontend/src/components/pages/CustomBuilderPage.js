import React from 'react';
import { Container, Grid } from '@mui/material';
import LandingCentralContent from '../layout/LandingCentralContent';
import LandingLeftContent from '../layout/LandingLeftContent';

function CustomBuilderPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <LandingLeftContent>
            <h1>Left Sidebar</h1>
      
          </LandingLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <LandingCentralContent>
          <h1>Custom Build Page</h1>
      
        </LandingCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default CustomBuilderPage;
