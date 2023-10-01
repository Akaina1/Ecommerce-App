import React from 'react';
import Container from '@mui/material/Container';

function RightContent({ children }) {
  return (
    <Container maxWidth={false} className="right-content">
      {children}
    </Container>
  );
}

export default RightContent;
