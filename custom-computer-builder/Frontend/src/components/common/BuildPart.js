import React from 'react';
import PropTypes from 'prop-types';

function BuildPart({ partType, product }) {
  return (
    <div className="build-part">
      {/* If product exists, render filled state. Otherwise, render empty state. */}
      {product ? (
        <div className="filled">
          <span>{product.name}</span>
          <span>${product.price}</span>
        </div>
      ) : (
        <div className="empty">
          <span>{`Empty ${partType}`}</span>
        </div>
      )}
    </div>
  );
}

BuildPart.propTypes = {
  partType: PropTypes.string.isRequired,
  product: PropTypes.object,
};

export default BuildPart;