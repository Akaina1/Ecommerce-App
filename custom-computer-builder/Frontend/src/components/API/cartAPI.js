import axios from 'axios';

// Base URL for your Cart API
const baseURL ='https://custompc-backend.fly.dev/api/carts'||'http://localhost:5000/api/carts';

// Function to add a product to the cart
export const handleAddToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}/add`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred while adding the item to the cart:', error);
    return null;
  }
};

// Function to remove a product from the cart
export const handleRemoveFromCart = async (cartId, productId) => {
  try {
    const response = await axios.put(`${baseURL}/${cartId}/remove-item`, {
      productId,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred while removing the item from the cart:', error);
    return null;
  }
};