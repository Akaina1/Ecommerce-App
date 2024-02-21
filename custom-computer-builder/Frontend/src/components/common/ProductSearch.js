import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import '../SASS/ProductSearch.scss';

function ProductSearch() {
  // Local state to hold the search query and selected category
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handler for search query input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the URL with query parameters
    let url = `/products?page=1&limit=15`;
    if (searchQuery) url += `&search=${searchQuery}`;
    if (selectedCategory) url += `&filter=${selectedCategory}`;

    // Navigate to the product page with the query parameters
    navigate(url);
  };

  return (
    <form className="product-search-container" onSubmit={handleSubmit}>
      <TextField 
        label="Search Products" 
        variant="outlined" 
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Select 
        label="Category" 
        variant="outlined" 
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <MenuItem value="Laptops">Laptops</MenuItem>
        <MenuItem value="Pre-Built Desktops">Pre-Built Desktops</MenuItem>
        <MenuItem value="PC Components">PC Components</MenuItem>
        <MenuItem value="Computer Peripherals">Computer Peripherals</MenuItem>
        <MenuItem value="Networking">Networking</MenuItem>
        <MenuItem value="Monitors">Monitors</MenuItem>
        {/* Add more categories here */}
      </Select>

      <Button 
        variant="contained" 
        color="button" 
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default ProductSearch;