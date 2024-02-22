import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '../store/store';
import theme from '../SASS/MUI Theme/muiTheme';
import '../SASS/main.scss'; 

import Header from './Header';
import Footer from './Footer';
import { AuthenticationProvider } from '../common/AuthenticationProvider'; // Import the updated AuthenticationProvider

import LandingPage from '../pages/LandingPage';
import ProductPage from '../pages/ProductPage';
import CustomBuilderPage from '../pages/CustomBuilderPage';
import UserDashboard from '../pages/UserDashboard';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { CssBaseline } from '@mui/material';

function App() {
  const [selectedOption, setSelectedOption] = useState('Profile'); // Default selection

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthenticationProvider>
            <div className="App">
              {/* Header Component */}
              <Header />

              {/* Main Content */}
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/custom-build" element={<CustomBuilderPage />} />

                {/* User Dashboard Route */}
                <Route
                  path="/user-dashboard"
                  element={
                    <UserDashboard
                      onSelect={handleOptionSelect}
                      selectedOption={selectedOption}
                    />
                  }
                />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                {/* ... other routes */}
              </Routes>

              {/* Footer Component */}
              <Footer />
            </div>
          </AuthenticationProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;