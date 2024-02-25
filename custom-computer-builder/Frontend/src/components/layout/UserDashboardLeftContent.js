import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import  DevModal  from '../common/DevModal';

function UserDashboardLeftContent({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('Profile'); // Default selection
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);

    console.log('Option selected: ', option);
  };

  const handleOpenDevModal = () => {
    setIsDevModalOpen(true);
  }

  const handleCloseDevModal = () => {
    setIsDevModalOpen(false);
  }

  return (
    <Container maxWidth={false} className="user-dashboard-left-content">
      <h1>User Dashboard</h1>
      <Button onClick={() => handleOptionClick('Profile')}>Profile</Button>
      <Button onClick={() => handleOptionClick('My Builds')}>My Builds</Button>
      <Button onClick={handleOpenDevModal}>Orders</Button>
      <Button onClick={handleOpenDevModal}>Address Book</Button>

      <DevModal isOpen={isDevModalOpen} onClose={handleCloseDevModal} />
    </Container>
  );
}

export default UserDashboardLeftContent;