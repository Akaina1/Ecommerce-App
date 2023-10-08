import React from 'react';
import { Container } from '@mui/material';

function BuildCentralContent({ children }) {
  return (
    <Container maxWidth={false} className="build-central-content">
      {children} 
    </Container>
  );
}

export default BuildCentralContent;