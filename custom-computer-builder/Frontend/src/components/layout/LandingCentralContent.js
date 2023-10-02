// LandingCentralContent.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import ProductBanner from '../common/ProductBanner';

function LandingCentralContent({ children }) {
  return (
    <Container maxWidth={false} className="central-content">
      {children}
      <Grid container spacing={3}> 
        <Grid item xs={12}>
          <ProductBanner
            size={'lg'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductBanner
            size={'md'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductBanner
            size={'sm'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductBanner
            size={'sm'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductBanner
            size={'lg'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductBanner
            size={'md'}
            imageSrc="https://picsum.photos/id/54/1920/1080"
            title="New Arrivals"
            description="Check out our latest collection"
            buttonText="Shop Now"
            buttonLink="/shop"
          />
        </Grid>
        {/* other banners */}
      </Grid>
    </Container>
  );
}

export default LandingCentralContent;