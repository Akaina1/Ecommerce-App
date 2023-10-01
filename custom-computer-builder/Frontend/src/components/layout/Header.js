import React from 'react';
import NavButton from '../common/NavButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Header() {
  return (
    <AppBar position="static" className="App-header">
      <Toolbar>
        {/* Logo */}
        <div className="logo">
          <h1>CustomPC</h1>
        </div>

        {/* Navigation */}
        <nav className="App-nav">
          <NavButton label="Home" path="/" />
          <NavButton label="Products" path="/products" />
          <NavButton label="Custom Build" path="/custom-build" />
          <NavButton label="User Dashboard" path="/user-dashboard" />
          {/* ... other NavButtons */}
        </nav>

        {/* User and Cart Icons */}
        <div className="icons">
          {/* Placeholder for user and cart icons */}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;