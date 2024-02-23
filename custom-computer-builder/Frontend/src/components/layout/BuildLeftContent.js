import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import BuildPart from '../common/BuildPart';
import { SelectPartModal } from '../common/SelectPartModal';

function BuildLeftContent({ toggleAestheticPart }) {
  const [selectedParts, setSelectedParts] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartType, setSelectedPartType] = useState(null);
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

  // function to handle clicking on BuildPart
  const handlePartClick = (partType) => {
    setSelectedPartType(partType);
    setIsModalOpen(true);
  };

  // function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartType(null);
  };


  return (
    <Container maxWidth={false} className="build-left-content">
      <h1>Customize Your Build</h1>
      {/* List of customizable parts */}
      <div className="parts-list">
        {PART_TYPES.map((partType) => (
          <div key={partType} onClick={() => handlePartClick(partType)}>
            <BuildPart
              partType={partType}
              product={selectedParts[partType]}
            />
          </div>
        ))}
      </div>

      {/* Display total cost */}
      <div className="total-cost">
        Total: ${totalCost}
      </div>

      {/* Placeholder buttons for future features */}
      <div className='save-share-buttons'>
      <Button className='save-build'>Save Build</Button>
      <Button className='share-build'>Load Build</Button>
      </div>

      {/* Checkout button */}
      <Button className='checkout'>Add Build to Cart</Button>

      {/* SelectPartModal */}
      {isModalOpen && selectedPartType && (
      <SelectPartModal
        isOpen={isModalOpen}
        partType={selectedPartType}
        closeModal={closeModal}
        handlePartSelect={handlePartSelect}
      />
    )}

    </Container>
  );
}

export default BuildLeftContent;