import React from 'react';
import '../SASS/CartSection.scss'
import { Button } from '@mui/material';

function CartSection() {
    // Mock cart data for demonstration
    const cartItems = [
      { name: "Item 1", quantity: 2, price: 50 },
      { name: "Item 2", quantity: 1, price: 100 },
    ];
  
    return (
      <div className="cart-section-container">
        <h3>Your Cart:</h3>
        
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name} (x{item.quantity})</span>
            <span>${item.price}</span>
          </div>
        ))}
  
        <div className="cart-summary">
          <div className="cart-summary-item">
            <span>Total</span>
            <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
          </div>
          <div className="cart-summary-item">
            <span>Estimated Tax</span>
            <span>${Math.round(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1)}</span>
          </div>
            <Button variant="contained" color="primary" className="checkout-button">Checkout</Button>        
        </div>
      </div>
    );
  }

export default CartSection;