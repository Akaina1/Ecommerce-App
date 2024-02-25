import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DevModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          p: 2,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          In Development
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          This functionality is still in development.
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DevModal;