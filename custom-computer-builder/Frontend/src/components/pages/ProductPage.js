import React from 'react';
import { Container, Grid } from '@mui/material';
import ProductCentralContent from '../layout/ProductCentralContent';
import ProductLeftContent from '../layout/ProductLeftContent';

function ProductPage() {
  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
          <ProductLeftContent>
            <h1>Left Sidebar</h1>
       
          </ProductLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <ProductCentralContent>
          <h1>Product Page</h1>
  
        </ProductCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default ProductPage;

