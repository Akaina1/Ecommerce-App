import axios from 'axios';

// Base URL for your Cart API
const baseURL = 'http://localhost:5000/api/carts';

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