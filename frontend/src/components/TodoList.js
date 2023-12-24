import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const TodoList = ({ todoList, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todoList.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.id}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell>{todo.dueDate}</TableCell>
            <TableCell>
              <Button variant="outlined" onClick={() => onEdit(todo.id)}>
                Edit
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => onDelete(todo.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
