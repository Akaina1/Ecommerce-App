// Footer.js
import React from 'react';
import Paper from '@mui/material/Paper';
// function Footer() {
//   return (
//     <footer className="app-footer">
//       <div className="footer-links">
//         {/* Placeholder for footer links */}
//       </div>
//       <div className="footer-text">
//         <p>© 2023 CustomPC. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

function Footer() {
  return (
    <Paper elevation={3} className="Footer">
      <p>© 2023 CustomPC. All rights reserved.</p>
      {/* Additional footer content can go here */}
    </Paper>
  );
}

export default Footer;