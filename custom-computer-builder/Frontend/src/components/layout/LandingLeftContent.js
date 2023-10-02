import React from 'react';
import { Container, Grid } from '@mui/material';
import { productstest } from '../../testdata';
import ProductCard from '../common/ProductCard';


function LandingLeftContent({ children }) {
  return (
    <Container maxWidth={false} className="left-content">
      {children}
      <Grid 
        container 
        spacing={2} 
        direction={'column'}  
        justifyContent="center" 
        alignItems="center"  
      >
        {productstest.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}> 
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LandingLeftContent;