import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal'; // Correct import
import BuildPart from './BuildPart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/actions'; 


function SelectPartModal({ isOpen, partType, closeModal, handlePartSelect }) {
  // Initialize Redux dispatch
  const dispatch = useDispatch();
  
  // Access Redux store
  const products = useSelector(state => state.products);  

  useEffect(() => {
    if (isOpen && partType) {
      // Here, 1 and 10 are sample values for 'page' and 'limit'.
      // 'partType' is used for filtering products by 'productTags'.
      dispatch(fetchProducts(1, 10, null, null, null, partType));
    }
  }, [isOpen, partType, dispatch]);

    // Render the modal body
  const modalBody = (
    <div className="modal-content">
      <h2>Select a {partType}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => {
              handlePartSelect(partType, product); // Pass the selected part to the parent component
              closeModal();  //  close the modal after selection
            }}
          >
            <BuildPart
              partType={partType}
              product={product}
            />
          </div>
        ))}
      </div>
      <button onClick={closeModal}>Close</button>
    </div>
  );

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {modalBody}
    </Modal>
  );
}

SelectPartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  partType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  handlePartSelect: PropTypes.func.isRequired,
};

export { SelectPartModal };