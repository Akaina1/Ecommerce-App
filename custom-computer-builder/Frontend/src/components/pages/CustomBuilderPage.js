import React from 'react';
import { Container, Grid } from '@mui/material';
import CentralContent from '../layout/CentralContent';
import LeftContent from '../layout/LeftContent';

function CustomBuilderPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <LeftContent>
            <h1>Left Sidebar</h1>
            {/* Your left sidebar content here */}
          </LeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <CentralContent>
          <h1>Custom Build Page</h1>
          {/* Your main content here */}
        </CentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default CustomBuilderPage;
