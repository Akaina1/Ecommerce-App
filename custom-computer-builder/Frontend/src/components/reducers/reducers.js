import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
  } from '../actions/actions.js';
  
  const initialState = {
    loading: false,
    products: [],
    error: null,
    totalProductCount: 0
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true };
      case FETCH_PRODUCTS_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          products: action.payload.products,
          totalProductCount: action.payload.totalProductCount
        };
      case FETCH_PRODUCTS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default productsReducer;  