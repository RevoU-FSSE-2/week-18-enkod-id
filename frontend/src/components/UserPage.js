import React, { useState } from 'react';
import UserList from './UserList';
import Navbar from '../components/Navbar';

const UserPage = ({ user }) => {
  const [todoList] = useState([
    // Sample task data
    { id: 1, title: 'Complete Project', description: 'Build React project', priority: 'High', dueDate: '2023-12-31' },
    // Add more tasks as needed
  ]);

  const handleEdit = (taskId) => {
    // Logic to handle task editing
    console.log('Edit task with ID:', taskId);
  };

  const handleDelete = (taskId) => {
    // Logic to handle task deletion
    console.log('Delete task with ID:', taskId);
  };

  const handleLogout = () => {
    // Logic for logout (adjust as needed for your application)
    console.log('Logout');
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />

      <h1>Welcome, {user.name}!</h1>
      <h2>Todo List</h2>
      <UserList todoList={todoList} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserPage;
