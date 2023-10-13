import React, { useState } from 'react';

const PartSlot = ({ partType, partSVG, className }) => {
  // State to determine if the slot has a part selected or not.
  const [isPartSelected, setIsPartSelected] = useState(false);

  // Function to indicate that a part has been selected.
  const selectPart = () => {
    setIsPartSelected(true);
    // Code to close modal and other operations can go here.
  };

  return (
    <div className={`part-slot ${className}`}>
      <img 
        src={partSVG}
        className={isPartSelected ? 'part-selected' : 'flashing'}
        alt={`${partType} slot`}
      />
    </div>
  );
};

export default PartSlot;