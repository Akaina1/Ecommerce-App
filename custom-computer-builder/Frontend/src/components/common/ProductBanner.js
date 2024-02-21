// ProductBanner.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../SASS/ProductBanner.scss';

function ProductBanner({ size, imageSrc, title, description, buttonLink, buttonText }) {
    // Set height based on the size prop
    const getHeight = () => {
      switch (size) {
        case 'sm':
          return 300;
        case 'md':
          return 400;
        case 'lg':
          return 500;
        default:
          return 400;  // Default height
      }
    };
  
    return (
        <Box
          className="product-banner"
          sx={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',  // Ensures image covers the area
            backgroundPosition: 'center',
            maxWidth: '100%',  // Ensures the banner fits within the parent width
            height: getHeight(),  // Function to set height based on size prop
            padding: 2,
            color: 'black',
        
          }}
        >
        <div className="banner-content">
          <Typography variant="h2" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            {description}
          </Typography>
          <Button variant="contained" color="button" href={buttonLink}>
            {buttonText}
          </Button>
        </div>
      </Box>
    );
  }
  
  export default ProductBanner;