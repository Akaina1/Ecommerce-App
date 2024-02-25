import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import BuildPart from '../common/BuildPart';
import { SelectPartModal } from '../common/SelectPartModal';
import { useAuth } from '../common/AuthenticationProvider';
import { createBuild } from '../API/buildsAPI';
import { useBuild } from '../common/BuildProvider';

function BuildLeftContent({ loadedBuild }) {
  const [selectedParts, setSelectedParts] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartType, setSelectedPartType] = useState(null);
  const storedToken = localStorage.getItem('token'); 
  const {userId} = useAuth();
  
  console.log('BuildLeftContent re-rendered. Selected Parts:', selectedParts);
  console.log('loadedBuild:', loadedBuild);

  const PART_TYPES = [
    'CPU',
    'GPU',
    'RAM',
    'MOBO',
    'SSD',
    'HDD',
    'PSU',
    'CASE',
    'COOLING',
    'FRONTFANS',
    'BACKFANS',
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

  // Function to handle saving or updating a build
  const handleSaveBuild = async () => {
    try {
      // Prepare the new build object
      const newBuild = {
        user: userId, // Use the userId obtained from the context
        parts: selectedParts,
        totalPrice: totalCost,
      };

      // Use the createBuild function to create a new build
      const createBuildResult = await createBuild(newBuild, storedToken); // Replace with the actual auth token

      if (createBuildResult.success) {
        // Handle success, e.g., show a success message, update UI, etc.
        console.log('Build created successfully:', createBuildResult.build);
        window.location.reload();
      } else {
        // Handle failure, e.g., show an error message, log the error, etc.
        console.error('Failed to create build:', createBuildResult.message);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error during build creation:', error);
    }
  };

  // Function to handle setting each part from the loaded build
  const setPartsFromLoadedBuild = (loadedBuild) => {
    const partsFromLoadedBuild = loadedBuild.parts || {};
    setSelectedParts(partsFromLoadedBuild);

    // Calculate the total cost based on the loaded build
    const totalCostFromLoadedBuild = loadedBuild.totalPrice || 0;
    setTotalCost(totalCostFromLoadedBuild);
  };




  // useEffect to update selected parts when loadedBuild changes
  useEffect(() => {
    if (loadedBuild) {
      // Set parts from the loaded build
      setPartsFromLoadedBuild(loadedBuild);
    }
  }, [loadedBuild]);





  const handleUpdateBuild = () => {
    // Logic to update existing build
    console.log('Update build logic here');
  }


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

      {/* Save and Load buttons */}
      <div className='save-load-update-buttons'>
        <Button className='save-build' onClick={handleSaveBuild}>Save Build</Button>
        <Button className='update-build' onClick={handleUpdateBuild}>Update Build</Button>
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