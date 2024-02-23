import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductCard from '../common/ProductCard';
import ProductModal from '../common/ProductModal';
import { fetchOnSaleProducts } from '../API/productAPI';

function LandingLeftContent({ children }) {
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);  
  const [displayIndex, setDisplayIndex] = useState(0);
  const [openModalProduct, setOpenModalProduct] = useState(null);  
  const [shouldCycle, setShouldCycle] = useState(true);
  
  const calculateProductsPerPage = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
  
    if (screenWidth >= 2560 && screenHeight >= 1440) {
      return 3; 
    } else if (screenWidth >= 1920 && screenHeight >= 1080) {
      return 2; 
    } else {
      return 1; 
    }
  };
  
  const productsPerPage = calculateProductsPerPage();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);  
        const products = await fetchOnSaleProducts();
        setOnSaleProducts(products);
        setIsLoading(false);  
      } catch (error) {
        console.error('Error fetching on-sale products: ', error);
        setError("Could not fetch the products. Please try again later.");
        setIsLoading(false);  
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (shouldCycle) {
      timer = setInterval(() => {
        cycleProducts();
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [onSaleProducts, shouldCycle]);  

  const cycleProducts = () => {
    setDisplayIndex((prevIndex) => {
      let newIndex = prevIndex + 3;

      if (newIndex >= onSaleProducts.length) {
        newIndex = 0;
      } else if (newIndex + 3 > onSaleProducts.length) {
        newIndex = onSaleProducts.length - (onSaleProducts.length % 3 || 3);
      }

      return newIndex;
    });
  };

  const openModal = (product) => {
    setOpenModalProduct(product);
    setShouldCycle(false);  // Stop cycling when the modal opens
  };

  const closeModal = () => {
    setOpenModalProduct(null);
    setShouldCycle(true);  // Resume cycling when the modal closes
  };

  const handleMouseEnter = () => {
    setShouldCycle(false);  // Stop cycling when mouse enters
  };

  const handleMouseLeave = () => {
    setShouldCycle(true);  // Resume cycling when mouse leaves
  };

  // Select the products to display based on the current index.
  const displayedProducts = onSaleProducts.slice(displayIndex, displayIndex + productsPerPage);

  return (
    <Container maxWidth={false} className="left-content">
      {children}
      <div className="button-container">
        <Button className='pagination-btn' onClick={() => cycleProducts('prev')}>Previous</Button>
        <Button className='pagination-btn' onClick={() => cycleProducts('next')}>Next</Button>
      </div>
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
          onMouseEnter={handleMouseEnter}  
          onMouseLeave={handleMouseLeave}  
        > 
          <ProductCard product={product} onClick={() => openModal(product)} />
        </Grid>
        ))}
      </Grid>
      { openModalProduct && <ProductModal open={!!openModalProduct} product={openModalProduct} onClose={closeModal} /> }
    </Container>
  );
}

export default LandingLeftContent;