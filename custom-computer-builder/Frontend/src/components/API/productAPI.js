import axios from 'axios';

const BASE_URL = 'https://custompc-backend.fly.dev/api/products'||'http://localhost:5000/api/products';

export const fetchOnSaleProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/onsale`);
      return response.data;
    } catch (error) {
      console.error('An error occurred while fetching on-sale products: ', error);
      throw error;
    }
  };