import React from 'react';
import { Container } from '@mui/material';

function BuildLeftContent({ children }) {
  
  return (
    <Container maxWidth={false} className="build-left-content">
      {children}
      
    </Container>
  );
}

export default BuildLeftContent;