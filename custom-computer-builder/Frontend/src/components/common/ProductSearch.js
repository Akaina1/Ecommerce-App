import React from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import '../SASS/ProductSearch.scss'

function ProductSearch() {
  return (
    <div className="product-search-container">
      <TextField label="Search Products" variant="outlined" />
      <Select label="Category" variant="outlined">
        {/* Add more categories here */}
      </Select>
    </div>
  );
}

export default ProductSearch;