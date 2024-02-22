import React from 'react';
import { Container } from '@mui/material';
import Profile from '../common/Profile'; // Import your components
import UserBuilds from '../common/UserBuilds';
import UserOrders from '../common/Orders';
import AddressBook from '../common/AddressBook';

function UserDashboardCentralContent({ selectedOption }) {
  // Helper function to render the appropriate component based on the selected option
  const renderContent = () => {
    switch (selectedOption) {
      case 'Profile':
        return <Profile />;
      case 'My Builds':
        return <UserBuilds />;
      case 'Orders':
        return <UserOrders />;
      case 'Address Book':
        return <AddressBook />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={false} className="user-dashboard-central-content">
      {renderContent()}
    </Container>
  );
}

export default UserDashboardCentralContent;