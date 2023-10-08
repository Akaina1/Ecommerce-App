import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductCard from '../common/ProductCard';
import { fetchOnSaleProducts } from '../API/productAPI';

function LandingLeftContent({ children }) {
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error handling
  const [displayIndex, setDisplayIndex] = useState(0);  // New State

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);  // Set loading to true before fetching data
        const products = await fetchOnSaleProducts();
        setOnSaleProducts(products);
        setIsLoading(false);  // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching on-sale products: ', error);
        setError("Could not fetch the products. Please try again later.");
        setIsLoading(false);  // Set loading to false if an error occurs
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      cycleProducts();
    }, 5000);

    return () => clearInterval(timer);
  }, [onSaleProducts]);

  const cycleProducts = () => {
    // Cycle products 3 at a time or display the remainder.
    setDisplayIndex((prevIndex) => {
      let newIndex = prevIndex + 3;

      if (newIndex >= onSaleProducts.length) {
        // If newIndex is greater than the total number of products, start over at 0
        newIndex = 0;
      } else if (newIndex + 3 > onSaleProducts.length) {
        // If adding another 3 exceeds the length, go to the last index
        newIndex = onSaleProducts.length - (onSaleProducts.length % 3 || 3);
      }

      return newIndex;
    });
  };

  // Select the products to display based on the current index.
  const displayedProducts = onSaleProducts.slice(displayIndex, displayIndex + 3);

  return (
    <Container maxWidth={false} className="left-content">
      {children}
      <div className="button-container">
        <Button className='pagination-btn' onClick={() => cycleProducts('prev')}>Previous</Button>
        <Button className='pagination-btn' onClick={() => cycleProducts('next')}>Next</Button>
      </div>
      {/* Existing Loading and Error states */}
      <Grid 
        container 
        spacing={2} 
        direction={'column'}  
        justifyContent="center" 
        alignItems="center"  
      >
        {displayedProducts.map((product) => (
          <Grid 
          item xs={12} sm={6} md={4} 
          key={product._id}
          className="product-card visible" // No idea what this is for but it works
        > 
          <ProductCard product={product} />
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LandingLeftContent;