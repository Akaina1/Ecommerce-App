// NavButton.js
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthenticationProvider'; // Update the path

function NavButton({ label, path }) {
  const { isLoggedIn } = useAuth(); // Use the hook to get isLoggedIn

  const isUserDashboardButton = path === '/user-dashboard';

  return (
    <Button
      className={`nav-button ${isUserDashboardButton && !isLoggedIn ? 'disabled' : ''}`}
      variant="contained"
      color="button"
      disabled={isUserDashboardButton && !isLoggedIn}
    >
      <Link to={path} className="nav-link" style={{ color: 'black', textDecoration: 'none' }}>
        {label}
      </Link>
    </Button>
  );
}

export default NavButton;