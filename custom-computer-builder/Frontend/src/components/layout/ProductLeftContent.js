import React, { useState, useEffect, useCallback, useRef} from 'react';
import { Container, Button } from '@mui/material';
import useDebounce from '../actions/debounce';
import '../SASS/main.scss';

function ProductLeftContent({ setSearch, setFilter, setSort }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilter = useCallback((category) => {
    setActiveFilter(prevFilter => {
      const newFilter = prevFilter === category ? null : category;
      setFilter(newFilter);
      return newFilter;
    });
  }, [setFilter]);
  
  const handleSort = useCallback((sortOption) => {
    setActiveSort(prevSort => {
      const newSort = prevSort === sortOption ? null : sortOption;
      setSort(newSort);
      return newSort;
    });
  }, [setSort]);

  useEffect(() => {
    setSearch(debouncedSearchQuery);  // Debounced update for search
    setFilter(activeFilter);          // Immediate update for filter
    setSort(activeSort);              // Immediate update for sort
  }, [debouncedSearchQuery, activeFilter, activeSort, setSearch, setFilter, setSort]);
  

  const createHandleFilter = useCallback((category) => () => handleFilter(category), [handleFilter]);
  const createHandleSort = useCallback((sortOption) => () => handleSort(sortOption), [handleSort]);

  return (
    <Container maxWidth={false} className="left-content-products">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="search-bar"
      />
      <div className="filter-options">
        <Button className={activeFilter === 'Laptops' ? 'active' : ''} 
        onClick={createHandleFilter('Laptops')}>Laptops</Button>
        <Button className={activeFilter === 'Pre-Built Desktops' ? 'active' : ''}
        onClick={createHandleFilter('Pre-Built Desktops')}>Pre-Built Desktops</Button>
        <Button className={activeFilter === 'PC Components' ? 'active' : ''}
        onClick={createHandleFilter('PC Components')}>PC Components</Button>
        <Button className={activeFilter === 'Computer Peripherals' ? 'active' : ''}
        onClick={createHandleFilter('Computer Peripherals')}>Computer Peripherals</Button>
        <Button className={activeFilter === 'Networking' ? 'active' : ''}
        onClick={createHandleFilter('Networking')}>Networking</Button>
        <Button className={activeFilter === 'Monitors' ? 'active' : ''}
        onClick={createHandleFilter('Monitors')}>Monitors</Button>
        {/* ...other categories... */}
      </div>
      <div className="sort-options">
        <Button className={activeSort === 'price_asc' ? 'active' : ''}
        onClick={createHandleSort('price_asc')}>Price: Low to High</Button>
        <Button className={activeSort === 'price_desc' ? 'active' : ''}
        onClick={createHandleSort('price_desc')}>Price: High to Low</Button>
        {/* ...other sorting options... */}
      </div>
    </Container>
  );
}

export default ProductLeftContent;