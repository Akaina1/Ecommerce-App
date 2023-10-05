import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const BASE_URL = 'http://localhost:5000/api/products';

export const fetchProducts = (page, limit, searchQuery, filter, sort) => {
  console.log('Fetching products with:', { page, limit, searchQuery, sort, filter });  
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;
      if (searchQuery) url += `&search=${searchQuery}`;
      if (sort) url += `&sort=${sort}`;
      if (filter) url += `&filter=${filter}`; 
      
      console.log('Fetching products with URL:', url);  
      
      const response = await axios.get(url);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
      console.log('Fetched products with URL: ',  url);
    } catch (error) {
      console.error('An error occurred while fetching products: ', error);
      dispatch({ type: FETCH_PRODUCTS_FAILURE, error });
    }
  };
};