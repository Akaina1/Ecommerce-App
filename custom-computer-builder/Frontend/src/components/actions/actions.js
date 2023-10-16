import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const BASE_URL = 'http://localhost:5000/api/products';

export const fetchProducts = (page, limit, searchQuery, filter, sort, partType) => {
  //console.log('Fetching products with:', { page, limit, searchQuery, filter,sort  });  
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      let url = `${BASE_URL}?page=${page}&limit=${limit}`;
      if (searchQuery) url += `&search=${searchQuery}`;
      if (sort) url += `&sort=${sort}`;
      if (partType) url += `&filter=${partType}`;  
      else if (filter) url += `&filter=${filter}`;  
      
      //console.log('Fetching products with URL:', url);  
      
      const response = await axios.get(url);
      //console.log('Axios Response:', response);
      //console.log('Axios Response Data:', response.data);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('An error occurred while fetching products: ', error);
      dispatch({ type: FETCH_PRODUCTS_FAILURE, error });
    }
  };
};