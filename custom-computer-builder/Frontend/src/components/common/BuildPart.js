import React from 'react';
import PropTypes from 'prop-types';

function BuildPart({ partType, product }) {
  return (
    <div className={`build-part ${product ? 'filled' : 'empty'}`}>
      <div className="product-picture">
        {product && <img src={product.imageURL} alt={product.name} />}
      </div>
      <div className="product-info">
        <span className="product-name">
          {product ? product.name : `Empty ${partType}`}
        </span>
        <span className="product-price">
          {product ? `$${product.price}` : '$0'}
        </span>
      </div>
    </div>
  );
}

BuildPart.propTypes = {
  partType: PropTypes.string.isRequired,
  product: PropTypes.object,
};

export default BuildPart;