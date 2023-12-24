import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const TodoList = ({ todoList, onDelete }) => {
  return (
    
    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', border: '1px solid #ddd', margin: '0 auto' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>No</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Priority</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Due Date</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((todo, index) => (
          <tr key={todo.id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.title}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.description}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.priority}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.dueDate}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {/* Link menuju page edit dengan menggunakan ID todo */}
              <Link to={`/todo/edit/${todo.id}`}>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </Link>
              <Button variant="outlined" color="secondary" onClick={() => onDelete(todo.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
