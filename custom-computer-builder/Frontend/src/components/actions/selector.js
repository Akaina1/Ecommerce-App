import { createSelector } from 'reselect';

// Individual selectors
const selectProducts = state => state.products;
const selectLoading = state => state.loading;
const selectError = state => state.error;
export const selectTotalProductCount = state => state.totalProductCount;

// Memoized selector
const selectProductData = createSelector(
  selectProducts,
  selectLoading,
  selectError,
  selectTotalProductCount,
  (products, loading, error, totalProductCount) => ({
    products,
    loading,
    error,
    totalProductCount
  })
);

export default selectProductData;