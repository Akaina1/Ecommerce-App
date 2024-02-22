import React, { useState } from 'react';
import { Container, Button } from '@mui/material';

function UserDashboardLeftContent({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('Profile'); // Default selection

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);

    console.log('Option selected: ', option);
  };

  return (
    <Container maxWidth={false} className="user-dashboard-left-content">
      <h1>User Dashboard</h1>
      <Button onClick={() => handleOptionClick('Profile')}>Profile</Button>
      <Button onClick={() => handleOptionClick('My Builds')}>My Builds</Button>
      <Button onClick={() => handleOptionClick('Orders')}>Orders</Button>
      <Button onClick={() => handleOptionClick('Address Book')}>Address Book</Button>
    </Container>
  );
}

export default UserDashboardLeftContent;