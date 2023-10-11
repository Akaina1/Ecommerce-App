import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import BuildCentralContent from '../layout/BuildCentralContent';
import BuildLeftContent from '../layout/BuildLeftContent';

function CustomBuilderPage() {
  const [aestheticState, setAestheticState] = useState({
    frontWindow: true,
    backWindow: true,
    backCover: true,
    // ... other parts
  });

  const toggleAestheticPart = (...partTypes) => {
    let newAestheticState = { ...aestheticState };
    partTypes.forEach(partType => {
      newAestheticState[partType] = !newAestheticState[partType];
    });
    setAestheticState(newAestheticState);
  };

  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <BuildLeftContent toggleAestheticPart={toggleAestheticPart} />
        </Grid>
        <Grid item xs={10}>
          <BuildCentralContent aestheticState={aestheticState} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomBuilderPage;