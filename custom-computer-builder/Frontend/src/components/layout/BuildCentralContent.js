import React from 'react';
import { Container } from '@mui/material';
import UserBuilds from '../common/UserBuilds';

function BuildCentralContent() {
  return (
    <Container maxWidth={false} className="build-central-content">
      <UserBuilds />
    </Container>
  );
}

export default BuildCentralContent;