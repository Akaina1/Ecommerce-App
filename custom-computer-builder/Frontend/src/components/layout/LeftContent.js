import React from 'react';
import Container from '@mui/material/Container';

function LeftContent({ children }) {
  return (
    <Container maxWidth={false} className="left-content">
      {children}
    </Container>
  );
}

export default LeftContent;


// // MainContent.js
// import React from 'react';
// import Container from '@mui/material/Container';
// import '../SASS/MainContent.scss';  // Import the SASS file

// function MainContent({ children }) {
//   return (
//     <Container maxWidth="lg" className="Main-content">
//       {children}
//     </Container>
//   );
// }

// export default MainContent;