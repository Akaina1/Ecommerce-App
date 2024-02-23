import React, {useState, useEffect} from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductCard from '../common/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions/actions';
import { useLocation } from 'react-router-dom'; // import useLocation
import selectProductData, { selectTotalProductCount }from '../actions/selector';
import ProductModal from '../common/ProductModal';

const ProductCentralContent = React.memo(function ProductCentralContent({ search, filter, sort }) {
  // console.log('ProductCentralContent re-rendered');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProductData);
  const totalProductCount = useSelector(selectTotalProductCount); 
  const location = useLocation();  // Hook to get the current URL location
  const [openModalProduct, setOpenModalProduct] = useState(null);  // For Modal

  const calculateProductsPerPage = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
  
    if (screenWidth >= 2560 && screenHeight >= 1440) {
      return 15; 
    } else if (screenWidth >= 1920 && screenHeight >= 1080) {
      return 10; 
    } else {
      return 5; 
    }
  };
  
  const productsPerPage = calculateProductsPerPage();

  useEffect(() => {
    // Extract query params from the URL
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get('search');
    const urlFilter = params.get('filter');
  
    let fetchSearch = urlSearch !== null ? urlSearch : search;
    let fetchFilter = urlFilter !== null ? urlFilter : filter;

    // Fetch products based on the query params and existing state
  dispatch(fetchProducts(currentPage, productsPerPage, fetchSearch, fetchFilter, sort));

}, [dispatch, currentPage, location.search, search, filter, sort]);


  function handlePagination(direction) {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
  }
  
  const openModal = (product) => {
  setOpenModalProduct(product);
  };

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
            <ProductCard product={product} onClick={() => openModal(product)} />
          </Grid>
        ))}
      </Grid>
      { openModalProduct && <ProductModal open={!!openModalProduct} product={openModalProduct} onClose={() => setOpenModalProduct(null)} /> }     
  </Container>
  );
});

export default ProductCentralContent;