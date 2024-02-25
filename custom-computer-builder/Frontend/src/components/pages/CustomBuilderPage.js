import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import BuildCentralContent from '../layout/BuildCentralContent';
import BuildLeftContent from '../layout/BuildLeftContent';
import { useBuild } from '../common/BuildProvider';

function CustomBuilderPage() {
  const { loadedBuild, handleLoadBuild } = useBuild();

  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {/* Pass onLoadBuildClick prop to BuildLeftContent */}
          <BuildLeftContent
            onLoadBuildClick={handleLoadBuild}
            loadedBuild={loadedBuild}
          />
        </Grid>
        <Grid item xs={10}>
          <BuildCentralContent />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomBuilderPage;