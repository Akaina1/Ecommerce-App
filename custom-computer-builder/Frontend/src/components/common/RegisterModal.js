import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { registerUser } from '../API/userAPI';

const RegisterModal = ({ isOpen, handleClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    // Perform validation before calling the API
    if (!username || !email || !password || password !== confirmPassword) {
      // Display an error message or handle invalid input
      setRegistrationStatus('error');
      return;
    }

    // Call the registerUser function
    const result = await registerUser(username, email, password);

    // Check the result
    if (result.success) {
      console.log('Registration successful:', result.user);
      setRegistrationStatus('success');
      // You may want to close the modal or redirect the user after successful registration
      // handleClose();
    } else {
      console.error('Registration failed:', result.message);
      // Handle registration failure (e.g., display an error message)
      setRegistrationStatus('error');
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        {registrationStatus === 'success' ? (
          <>
            <Typography variant="h5" gutterBottom>
              Registration Successful!
            </Typography>
            <Typography color="success" gutterBottom>
              You can now log in using your credentials.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RegisterModal;
