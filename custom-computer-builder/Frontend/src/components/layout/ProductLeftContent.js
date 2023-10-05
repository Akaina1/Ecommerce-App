import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import { fetchProducts } from '../actions/actions';  
import '../SASS/main.scss';

function ProductLeftContent({ children, setSearch, setFilter, setSort }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeSort, setActiveSort] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (category) => { console.log('Filtering by:', category);
    setActiveFilter(prevFilter => {
      const newFilter = prevFilter === category ? null : category;
      setFilter(newFilter);  // Propagate the change upwards
      return newFilter;  // Return the new state
    });
  };

  const handleSort = (sortOption) => {
    setActiveSort(prevSort => {
      const newSort = prevSort === sortOption ? null : sortOption;
      setSort(newSort);  
      return newSort;  
    });
  };

  useEffect(() => {
    setSearch(searchQuery);
    setFilter(activeFilter);
    setSort(activeSort);
  }, [searchQuery, activeFilter, activeSort, setSearch, setFilter, setSort]);

  return (
    <Container maxWidth={false} className="left-content-products">
      {children}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="search-bar"
      />
      <div className="filter-options">
        <Button className={activeFilter === 'Laptops' ? 'active' : ''} 
                onClick={() => handleFilter('Laptops')}>Laptops</Button>
        <Button className={activeFilter === 'Pre-Built Desktops' ? 'active' : ''} 
                onClick={() => handleFilter('Pre-Built Desktops')}>Pre-Built Desktops</Button>
        <Button className={activeFilter === 'PC Components' ? 'active' : ''} 
                onClick={() => handleFilter('PC Components')}>PC Components</Button>
        <Button className={activeFilter === 'Computer Peripherals' ? 'active' : ''} 
                onClick={() => handleFilter('Computer Peripherals')}>Computer Peripherals</Button>
        <Button className={activeFilter === 'Networking' ? 'active' : ''} 
                onClick={() => handleFilter('Networking')}>Networking</Button>
        <Button className={activeFilter === 'Monitors' ? 'active' : ''} 
                onClick={() => handleFilter('Monitors')}>Monitors</Button>
        {/* ...other categories... */}
      </div>
      <div className="sort-options">
        <Button className={activeSort === 'price_asc' ? 'active' : ''} 
                onClick={() => handleSort('price_asc')}>Price: Low to High</Button>
        <Button className={activeSort === 'price_desc' ? 'active' : ''} 
                onClick={() => handleSort('price_desc')}>Price: High to Low</Button>
        {/* ...other sorting options... */}
      </div>
    </Container>
  );
}

export default ProductLeftContent;