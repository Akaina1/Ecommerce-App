import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productsReducer from '../reducers/reducers';

const store = configureStore({
  reducer: productsReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;