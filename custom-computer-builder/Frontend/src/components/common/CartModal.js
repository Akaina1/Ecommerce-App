import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CartSection from './CartSection'; // Import the CartSection component

function CartModal({ isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <CartSection />
      </Box>
    </Modal>
  );
}

export default CartModal;