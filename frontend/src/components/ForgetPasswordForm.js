import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleForgetPassword = () => {
    // Logika lupa password akan ditambahkan di sini
    console.log('Lupa Password dengan:', email);
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleForgetPassword}>
        Lupa Password
      </Button>
    </div>
  );
};

export default ForgetPasswordForm;
