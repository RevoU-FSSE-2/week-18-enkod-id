import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TodoPage = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  });
  const token = props.location?.state?.token || localStorage.getItem('token');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (!token) {
          console.error('Invalid token:', token);
          return;
        }

        const response = await fetch('http://localhost:5000/v1/todos/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);

        // Mengakses data dari properti results
        const todos = data.results || [];
        setTodoList(todos);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchTodos();
  }, [token]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({
    id: '',
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  });

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditTodo({
      id: '',
      title: '',
      description: '',
      priority: '',
      dueDate: '',
    });
  };

  const handleEditTodo = async () => {
    try {
      console.log('Edit Todo:', editTodo);
  
      const { id, ...todoToUpdate } = editTodo; // Menghilangkan properti "id"
      
      const url = `http://localhost:5000/v1/todos/${id}`;
      console.log('Edit URL:', url);
  
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(todoToUpdate), // Mengirim data tanpa properti "id"
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedTodoData = await response.json();
      console.log('Updated Todo Data:', updatedTodoData);
  
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodoData } : todo
      );
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  
    handleCloseEditModal();
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logout');
  };

  const handleDelete = async (taskId) => {
    console.log('Delete task with ID:', taskId);
  
    try {
      const response = await fetch(`http://localhost:5000/v1/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // assuming you have a token variable for authentication
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log(`Task with ID ${taskId} has been deleted.`);
      window.location.reload();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTodo = async () => {
    // Tambahkan logika untuk menangani aksi tambah todo
    console.log('New Todo:', newTodo);
  
    try {
      const response = await fetch('http://localhost:5000/v1/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // assuming you have a token variable for authentication
        },
        body: JSON.stringify(newTodo), // assuming newTodo is an object with the new todo data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.location.reload();
      const data = await response.json();
      console.log('Data:', data); // Log the data
  
    } catch (error) {
      console.error('An error occurred:', error);
    }
    handleCloseModal();
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>Todo List</h1>
      <Button variant="contained" onClick={handleOpenModal}>
        Add Todo
      </Button>
      {todoList.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>{todo.priority}</TableCell>
                    <TableCell>{todo.dueDate}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(todo)}>Edit</Button>
                      <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={todoList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <p>No todos available.</p>
      )}

      {/* Modal untuk menambah todo */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2 id="modal-title">Add Todo</h2>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Priority"
            variant="outlined"
            fullWidth
            margin="normal"
            name="priority"
            value={newTodo.priority}
            onChange={handleInputChange}
          />
          <TextField
            label="Due Date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="dueDate"
            value={newTodo.dueDate}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleAddTodo}>
            Add Todo
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Modal untuk edit todo */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2 id="modal-title">Edit Todo</h2>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={editTodo.title}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={editTodo.description}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Priority"
            variant="outlined"
            fullWidth
            margin="normal"
            name="priority"
            value={editTodo.priority}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Due Date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="dueDate"
            value={editTodo.dueDate}
            onChange={handleEditInputChange}
          />
          <Button variant="contained" onClick={handleEditTodo}>
            Edit Todo
          </Button>
          <Button variant="contained" onClick={handleCloseEditModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TodoPage;
