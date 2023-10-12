import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import BuildPart from '../common/BuildPart';

function BuildLeftContent({ toggleAestheticPart }) {
  // State to hold selected parts
  const [selectedParts, setSelectedParts] = useState({});
  // State to hold total cost
  const [totalCost, setTotalCost] = useState(0);
  // List of part types
  const PART_TYPES = [
    'CPU',
    'GPU',
    'RAM',
    'MOBO',
    'SSD',
    'HDD',
    'PSU',
    'Case',
    'Cooling',
    'FrontFans',
    'BackFans',
  ];

  // Function to handle part selection
  const handlePartSelect = (partType, product) => {
    const prevProduct = selectedParts[partType];
    const newSelectedParts = {
      ...selectedParts,
      [partType]: product,
    };
    setSelectedParts(newSelectedParts);
  
    // Update the total cost
    let costDifference = product ? product.price : 0;
    if (prevProduct) {
      costDifference -= prevProduct.price;
    }
    setTotalCost((prevTotal) => prevTotal + costDifference);
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
        {PART_TYPES.map((partType) => (
        <BuildPart 
          key={partType}
          partType={partType}
          product={selectedParts[partType]} // will be undefined if not selected, that's okay
        />
      ))}
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