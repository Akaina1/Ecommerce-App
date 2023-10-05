import React, {useState} from 'react';
import { Container, Grid } from '@mui/material';
import ProductCentralContent from '../layout/ProductCentralContent';
import ProductLeftContent from '../layout/ProductLeftContent';

function ProductPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
         <ProductLeftContent setSearch={setSearch} setFilter={setFilter} setSort={setSort}>
            <h1>Search</h1>
       
          </ProductLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <ProductCentralContent search={search} filter={filter} sort={sort}>
          <h1>Product Page</h1>
  
        </ProductCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default ProductPage;

