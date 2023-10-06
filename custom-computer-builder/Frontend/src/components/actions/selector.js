import { createSelector } from 'reselect';

// Individual selectors
const selectProducts = state => state.products;
const selectLoading = state => state.loading;
const selectError = state => state.error;

// Memoized selector
const selectProductData = createSelector(
  [selectProducts, selectLoading, selectError],
  (products, loading, error) => ({
    products,
    loading,
    error
  })
);

export default selectProductData;