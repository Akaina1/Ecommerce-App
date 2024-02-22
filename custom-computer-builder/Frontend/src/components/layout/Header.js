import React from 'react';
import NavButton from '../common/NavButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAuth } from '../common/AuthenticationProvider'; // Import the useAuth hook

function Header() {
  const { isLoggedIn, username } = useAuth(); // Use the hook to get isLoggedIn and username

  return (
    <AppBar position="static" className="App-header">
      <Toolbar>
        {/* Logo */}
        <div className="logo">
          <h1>Green Customs</h1>
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
          {isLoggedIn && <h3>Welcome, {username}</h3>}
          {/* You can also add a CartIcon component here */}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;