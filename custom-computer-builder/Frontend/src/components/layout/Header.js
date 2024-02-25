import React, { useState } from 'react';
import NavButton from '../common/NavButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAuth } from '../common/AuthenticationProvider';
import Logo from '../IMG/Green_Logo.png';
import CartModal from '../common/CartModal'; // Import the CartModal component
import { ShoppingCart } from '@mui/icons-material'; // Import the ShoppingCart icon

function Header() {
  const { isLoggedIn, username } = useAuth();
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const handleOpenCartModal = () => {
    setCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <AppBar position="static" className="App-header">
      <Toolbar>
        <div className="logo">
          <img src={Logo} alt="Logo" className='App-logo' />
        </div>

        <nav className="App-nav">
          <NavButton label="Home" path="/" />
          <NavButton label="Products" path="/products" />
          <NavButton label="Custom Build" path="/custom-build" />
          <NavButton label="User Dashboard" path="/user-dashboard" />
          {/* ... other NavButtons */}
        </nav>

        <div className="icons">
          {isLoggedIn && <h3 className="welcome-message">Welcome, {username}</h3>}
          
          {/* Button to open CartModal with a shopping cart icon */}
          <button onClick={handleOpenCartModal} className="cart-button">
            <ShoppingCart />
          </button>
        </div>

        {/* CartModal */}
        <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
