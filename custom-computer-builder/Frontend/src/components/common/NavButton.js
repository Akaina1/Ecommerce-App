// NavButton.js
import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NavButton({ label, path }) {
  return (
    <Button className="nav-button" variant="contained" color="button">
      <Link to={path} className="nav-link" style={{ color: 'black', textDecoration: 'none' }}>
        {label}
      </Link>
    </Button>
  );
}

export default NavButton;