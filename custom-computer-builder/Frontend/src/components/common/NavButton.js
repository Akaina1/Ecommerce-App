// NavButton.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavButton({ label, path }) {
  return (
    <Link to={path} className="nav-button">
      {label}
    </Link>
  );
}

export default NavButton;