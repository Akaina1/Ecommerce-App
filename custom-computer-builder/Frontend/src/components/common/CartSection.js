import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { getUserIdFromToken } from '../API/userAPI'; // Or wherever you have this function defined
import { handleRemoveFromCart } from '../API/cartAPI';

const BASE_URL = 'https://custompc-backend.fly.dev/api/carts'||'http://localhost:5000/api/carts';

function CartSection() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();

    const fetchData = async () => {
      try {
        // Only fetch data if userId is not null or undefined
        if (userId) {
          const response = await axios.get(`${BASE_URL}/${userId}`);
          setCartItems(response.data.items || []);
          setCartId(response.data._id);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    // Fetch data whenever cartId or cartItems change
    fetchData();
  }, [getUserIdFromToken(), cartId, cartItems]);

  // Function to handle removal of an item from the cart
  const handleRemoveItemClick = (productId) => {
    if (cartId) {
      handleRemoveFromCart(cartId, productId)
        .then((response) => {
          // Handle success, update cartItems
          console.log('Item removed successfully:', response);
        })
        .catch((error) => {
          console.error('Error removing item from the cart:', error);
        });
    } else {
      console.error('Cart ID is not available.');
    }
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
        <Button variant="contained" color="button" className="checkout-button">Checkout</Button>
      </div>
    </div>
  );
}

export default CartSection;