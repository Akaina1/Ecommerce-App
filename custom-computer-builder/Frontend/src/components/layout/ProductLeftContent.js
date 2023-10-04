import React from 'react';
import { Container, Button } from '@mui/material';

function ProductLeftContent({ children }) {
  return (
    <Container maxWidth={false} className="left-content">
      {children}
      {/* ... other UI elements like search bar and filters ... */}
      <div className="button-container">
        <Button className='LeftCycleBtn' onClick={() => cycleProducts('prev')}>Previous</Button>
        <Button className='RightCycleBtn' onClick={() => cycleProducts('next')}>Next</Button>
      </div>
    </Container>
  );
}

export default ProductLeftContent;
