import React from 'react';
import Container from '@mui/material/Container';
import ProductSearch from '../common/ProductSearch';
import UserInfo from '../common/UserInfo';
import CartSection from '../common/CartSection';

function LandingRightContent({ children }) {
  return (
    <Container maxWidth={false} className="right-content">
      {children}
      <ProductSearch />
      <UserInfo />
      <CartSection />
    </Container>
  );
}

export default LandingRightContent;