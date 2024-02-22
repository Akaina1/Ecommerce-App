// Footer.js
import React from 'react';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme();

  return (
    <Paper elevation={3} className="Footer" style={{ backgroundColor: theme.palette.primary.main, padding: '10px', color: 'white' }}>
      <p>© 2024 Green Customs. All rights reserved.</p>
      {/* Additional footer content can go here */}
    </Paper>
  );
}

export default Footer;