import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Reset error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Validate name
    if (!name.trim()) {
      setNameError('Please enter your name');
      return;
    }

    // Validate email
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Validate password
    if (!password.trim() || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Registration successful:', data);

      // Navigate to login page
      navigate('/login'); // Adjust this path according to your routing setup
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;