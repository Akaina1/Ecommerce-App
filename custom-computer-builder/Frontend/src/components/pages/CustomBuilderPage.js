import React from 'react';
import { Container, Grid } from '@mui/material';
import BuildCentralContent from '../layout/BuildCentralContent';
import BuildLeftContent from '../layout/BuildLeftContent';

function CustomBuilderPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <BuildLeftContent>
            <h1>Left Sidebar</h1>
      
          </BuildLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <BuildCentralContent>
          <h1>Custom Build Page</h1>
      
        </BuildCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default CustomBuilderPage;
