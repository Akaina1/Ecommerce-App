// File: ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function ProductCard({ product, onClick }) {
    return (
      <div onClick={() => onClick(product)}>
      <Card className="product-card" classes={{ root: 'my-card-root' }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={product.imageUrl || 'default-image-path.jpg'}
          className="product-image"
        />
        <CardContent>
          <Typography variant="h5" component="div" className="product-name">
            {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="product-category">
            Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="product-price">
            Price: ${product.price.toFixed(2)}
            </Typography>
            {product.onSale && (
            <Typography variant="body2" color="text.primary" className="product-sale">
            On Sale
            </Typography>
            )}
            </CardContent>
      </Card>
    </div>
    );
  }

export default ProductCard;

