import React, {useState, useEffect} from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductCard from '../common/ProductCard';
import {productstest} from '../../testdata.js';
import '../SASS/main.scss'

function ProductCentralContent({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  function handlePagination(direction) {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productstest.slice(indexOfFirstProduct, indexOfLastProduct);

  
  return (
    <Container maxWidth={false} className="central-content-products">
      <div className="pagination-buttons-products">
      <Button className='pagination-btn' 
              onClick={() => handlePagination('prev')} 
              disabled={currentPage === 1}>Previous</Button>
      <Button className='pagination-btn' 
              onClick={() => handlePagination('next')}
              disabled={currentPage === Math.ceil(productstest.length / productsPerPage)}>Next</Button>
    </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {currentProducts.map((product) => (
          <Grid
            item xs={12} sm={6} md={2}
            key={product.id}
            className="product-card visible"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>     
  </Container>
  );
}

export default ProductCentralContent;