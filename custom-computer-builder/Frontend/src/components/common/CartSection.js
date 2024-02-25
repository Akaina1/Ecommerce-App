import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { getUserIdFromToken } from '../API/userAPI'; // Or wherever you have this function defined
import { handleRemoveFromCart } from '../API/cartAPI';
import  DevModal  from '../common/DevModal';

const BASE_URL = 'https://custompc-backend.fly.dev/api/carts'||'http://localhost:5000/api/carts';

function CartSection() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isDevModalOpen, setDevModalOpen] = useState(false);

  useEffect(() => {
    const userId = getUserIdFromToken();
  
    const fetchData = async () => {
      try {
        // Only fetch data if userId is not null or undefined
        if (userId) {
          try {
            const response = await axios.get(`${BASE_URL}/${userId}`);
  
            if (response.data.msg && response.data.msg === 'Cart not found') {
              // Cart not found, create a new cart
              try {
                const newCartResponse = await axios.post(`${BASE_URL}`, {
                  user: userId,
                  items: [],
                });
  
                // Update the cartId and set an empty array for cartItems
                setCartId(newCartResponse.data._id);
                setCartItems([]);
              } catch (error) {
                console.error('Error creating new cart:', error);
              }
            } else {
              // Cart found, update cartId and cartItems
              setCartItems(response.data.items || []);
              setCartId(response.data._id);
            }
          } catch (error) {
            // Handle 404 error if the user's cart is not found
            if (error.response && error.response.status === 404) {
              console.log('User does not have a cart. Creating a new one.');
              try {
                const newCartResponse = await axios.post(`${BASE_URL}`, {
                  user: userId,
                  items: [],
                });
  
                // Update the cartId and set an empty array for cartItems
                setCartId(newCartResponse.data._id);
                setCartItems([]);
              } catch (error) {
                console.error('Error creating new cart:', error);
              }
            } else {
              // Handle other errors
              console.error('Error fetching cart:', error);
            }
          }
        }
      } catch (error) {
        console.error('General error:', error);
      }
    };
  
    // Fetch data whenever userId changes
    fetchData();
  }, [getUserIdFromToken()]);

  // Function to handle removal of an item from the cart
  const handleRemoveItemClick = (productId) => {
    if (cartId) {
      handleRemoveFromCart(cartId, productId)
        .then((response) => {
          // Handle success, update cartItems
          console.log('Item removed successfully:', response);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error removing item from the cart:', error);
        });
    } else {
      console.error('Cart ID is not available.');
    }
  };

  const handleOpenDevModal = () => {
    setDevModalOpen(true);
  };

  const handleCloseDevModal = () => {
    setDevModalOpen(false);
  };

  return (
    <div className="cart-section-container">
      <h3>Your Cart:</h3>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <Button className="custom-button" onClick={() => handleRemoveItemClick(item.productId)}>X</Button>
          <span>{item.product.name} (x{item.quantity})</span> 
          <span>${item.product.price}</span>
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-summary-item">
          <span>Total</span>
          <span>${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}</span>
        </div>
        <div className="cart-summary-item">
          <span>Estimated Tax</span>
          <span>${Math.round(cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) * 0.1)}</span>
        </div>
        <Button variant="contained" color="button" className="checkout-button" onClick={handleOpenDevModal}>Checkout</Button>

        <DevModal isOpen= {isDevModalOpen} onClose={handleCloseDevModal} />
      </div>
    </div>
  );
}

export default CartSection;