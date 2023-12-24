import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/v1/users');
    
        if (!response.ok) {
          if (response.status === 401) {
            // If a 401 status code is received, navigate to the login page
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data); // Log the data to the console
        setUsers(data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            {/* Add more table cells for additional user properties */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* Add more table cells for additional user properties */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}