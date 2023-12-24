import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const AddTodo = ({ onAdd }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    date: '',
  });

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = () => {
    // Lakukan logika penyimpanan tugas baru di sini
    console.log('Simpan tugas baru:', newTask);

    // Reset formulir setelah menyimpan tugas
    setNewTask({
      title: '',
      description: '',
      priority: 'Low',
      date: '',
    });

    // Panggil fungsi onAdd untuk memberi tahu komponen induk bahwa tugas baru telah ditambahkan
    onAdd(newTask);
  };

  return (
    
    <div style={{ marginTop: '20px', textAlign: 'center', marginLeft: '20px', marginRight: '20px' }}>
      <h2>Add New Todo</h2>
      <form>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <TextField
          select
          label="Priority"
          variant="outlined"
          fullWidth
          margin="normal"
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Due Date"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          name="date"
          value={newTask.date}
          onChange={handleInputChange}
        />
        <Button variant="outlined" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTodo;
