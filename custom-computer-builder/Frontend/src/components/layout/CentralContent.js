import React from 'react';
import Container from '@mui/material/Container';

function CentralContent({ children }) {
  return (
    <Container maxWidth={false} className="central-content">
      {children}
    </Container>
  );
}

export default CentralContent;
