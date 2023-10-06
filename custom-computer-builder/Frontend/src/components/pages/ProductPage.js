import React, {useState} from 'react';
import { Container, Grid } from '@mui/material';
import ProductCentralContent from '../layout/ProductCentralContent';
import ProductLeftContent from '../layout/ProductLeftContent';

function ProductPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  // console.log({ search, filter, sort });  // Log the prop values here

  return (
    <Container maxWidth={false} style={{ margin: 0, overflowX: 'hidden'}}>
      <Grid container spacing={2} >
        {/* Left Sidebar */}
        <Grid item xs={2}>
         <ProductLeftContent setSearch={setSearch} setFilter={setFilter} setSort={setSort}>
       
          </ProductLeftContent>
        </Grid>
  
        {/* Central Content */}
        <Grid item xs={10}>
        <ProductCentralContent search={search} filter={filter} sort={sort}>
  
        </ProductCentralContent>
        </Grid>
  
        </Grid>
    </Container>
  );
}

export default ProductPage;

