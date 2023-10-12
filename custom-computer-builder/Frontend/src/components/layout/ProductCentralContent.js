import React, {useState, useEffect} from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductCard from '../common/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions/actions';
import selectProductData, { selectTotalProductCount }from '../actions/selector';
import '../SASS/main.scss'

const ProductCentralContent = React.memo(function ProductCentralContent({ search, filter, sort }) {
  // console.log('ProductCentralContent re-rendered');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProductData);
  const totalProductCount = useSelector(selectTotalProductCount); 


  useEffect(() => {
    //console.log('Current Page:', currentPage);  // Debugging line
    //console.log('Total Products:', products.length);  // Debugging line
    // console.log('useEffect triggered', { search, filter, sort });
    dispatch(fetchProducts(currentPage, productsPerPage, search, filter, sort));
  }, [dispatch, currentPage, search, filter, sort]);

  function handlePagination(direction) {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
  }

  return (
    <Container maxWidth={false} className="central-content-products">
      <div className="pagination-buttons-products">
      <Button className='pagination-btn' 
              onClick={() => handlePagination('prev')} 
              disabled={currentPage === 1}>Previous</Button>
      <Button className='pagination-btn' 
              onClick={() => handlePagination('next')}
              disabled={currentPage === Math.ceil(totalProductCount / productsPerPage)}>Next</Button>
    </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {products.map((product) => (
          <Grid
            item xs={12} sm={6} md={2}
            key={product._id}
            className="product-card visible"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>     
  </Container>
  );
});

export default ProductCentralContent;