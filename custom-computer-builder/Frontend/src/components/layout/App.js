import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../SASS/MUI Theme/muiTheme';
import '../SASS/main.scss'; 

import Header from './Header';
import Footer from './Footer';

import LandingPage from '../pages/LandingPage';
import ProductPage from '../pages/ProductPage';
import CustomBuilderPage from '../pages/CustomBuilderPage';
import UserDashboard from '../pages/UserDashboard';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {/* Header Component */}
          <Header />

          {/* Main Content */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/custom-build" element={<CustomBuilderPage />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* ... other routes */}
          </Routes>

          {/* Footer Component */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;