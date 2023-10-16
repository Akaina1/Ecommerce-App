import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { getUserIdFromToken } from '../API/userAPI'; // Or wherever you have this function defined

function CartSection() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = getUserIdFromToken();
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/carts/${userId}`);
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cart-section-container">
      <h3>Your Cart:</h3>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
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
        <Button variant="contained" color="primary" className="checkout-button">Checkout</Button>
      </div>
    </div>
  );
}

export default CartSection;