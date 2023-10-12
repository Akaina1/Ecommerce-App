import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'your-modal-library'; // replace this with the modal library you're using
import BuildPart from './BuildPart'; // import the BuildPart component

function SelectPartModal({ isOpen, partType, closeModal, handlePartSelect }) {
  const [products, setProducts] = useState([]);

  // Placeholder for fetching products based on partType
  useEffect(() => {
    if (isOpen) {
      // Make an API call here to fetch products with the 'partType'
      // Update 'products' state with the fetched data
    }
  }, [isOpen, partType]);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Select a {partType}</h2>
      <div className="product-list">
        {products.map((product) => (
          <BuildPart
            key={product.id}
            partType={partType}
            product={product}
            onClick={() => handlePartSelect(partType, product)}
          />
        ))}
      </div>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}

SelectPartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  partType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  handlePartSelect: PropTypes.func.isRequired,
};

export default SelectPartModal;
