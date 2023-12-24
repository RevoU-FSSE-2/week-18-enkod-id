import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  const handleNavigation = (path) => {
    // Check if the token exists
    if (!localStorage.getItem('token')) {
      // If the token doesn't exist, navigate to the login page
      navigate('/login');
    } else {
      // If the token exists, navigate to the requested page
      navigate(path);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <Button color="inherit" onClick={() => handleNavigation('/todo')}>Todo List</Button>
        <Button color="inherit" onClick={() => handleNavigation('/users')}>Users</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;