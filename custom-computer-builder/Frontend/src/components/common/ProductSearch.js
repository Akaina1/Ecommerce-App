import React from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import '../SASS/ProductSearch.scss'

function ProductSearch() {
  return (
    <div className="product-search-container">
      <TextField label="Search Products" variant="outlined" />
      <Select label="Category" variant="outlined">
        <MenuItem value="Laptops">Laptops</MenuItem>
        <MenuItem value="Pre-Built Desktops">Pre-Built Desktops</MenuItem>
        <MenuItem value="PC Components">PC Components</MenuItem>
        <MenuItem value="Computer Peripherals">Computer Peripherals</MenuItem>
        <MenuItem value="Networking">Networking</MenuItem>
        <MenuItem value="Monitors">Monitors</MenuItem>
        {/* Add more categories here */}
      </Select>
    </div>
  );
}

export default ProductSearch;