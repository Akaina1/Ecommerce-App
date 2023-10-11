import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import ProductCard from '../common/ProductCard'; // Import your reusable ProductCard component

function BuildLeftContent({ toggleAestheticPart }) {
  // State to hold selected parts
  const [selectedParts, setSelectedParts] = useState({});

  // State to hold total cost
  const [totalCost, setTotalCost] = useState(0);

  // Function to handle part selection
  const handlePartSelect = (partType, product) => {
    setSelectedParts({
      ...selectedParts,
      [partType]: product,
    });

    // Update the total cost
    setTotalCost(prevTotal => prevTotal + product.price);
  };

  return (
    <Container maxWidth={false} className="build-left-content">
      <h1>Customize Your Build</h1>

      {/* Aesthetic toggles */}
      <div className='asthetic-controls'>
      <Button className='toggle-asthetic' onClick={() => toggleAestheticPart('frontWindow')}>Open Front Case</Button>
      <Button className='toggle-asthetic' onClick={() => toggleAestheticPart('backWindow', 'backCover')}>Open Back Case</Button>
      </div>

      {/* List of customizable parts */}
      <div className="parts-list">
        {/* Here, you can map over the parts and generate a ProductCard if a part is selected */}
      </div>

      {/* Display total cost */}
      <div className="total-cost">
        Total: ${totalCost}
      </div>

      {/* Placeholder buttons for future features */}
      <div className='save-share-buttons'>
      <Button className='save-build'>Save Build</Button>
      <Button className='share-build'>Share Build</Button>
      </div>

      {/* Checkout button */}
      <Button className='checkout'>Checkout</Button>

    </Container>
  );
}

export default BuildLeftContent;