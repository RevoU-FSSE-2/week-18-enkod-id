import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [todos, setTodos] = useState([])
  // console.log('data', email, password)
  const URL = process.env.REACT_APP_BE_ENDPOINT
  // console.log('URL', URL)
  console.log('todo', {
    title, description, priority, dueDate
  })

  useEffect(() => {
    const tokenFromLS = localStorage.getItem('token')
    setToken(tokenFromLS)
  }, [])
  const getTodos = async () => {
    const response = await axios.get(`${URL}/v1/todos`,
      config
    )
    console.log('getTodos', response)
    if (response && response.data) setTodos(response.data.results)
  }
  useEffect(() => {
    if (token) getTodos()
  }, [token])

  console.log('token', token)
  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  };

  const onLoginSubmit = () => {
    console.log(`email: ${email}, password: ${password}`)
    axios.post(`${URL}/v1/auth/login`, {
      email,
      password
    })
      .then(function (response) {
        console.log('login success', response);
        if (response && response.data && response.data.tokens && response.data.tokens.access) localStorage.setItem('token', JSON.stringify(response.data.tokens.access.token))
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onTodoSubmit = () => {
    console.log(`title: ${title}, desc: ${description}, priority: ${priority}`)
    axios.post(`${URL}/v1/todos`, {
      title,
      description,
      priority,
      dueDate,
    },
      config
    )
      .then(function (response) {
        console.log('create todo success', response);
        // if (response && response.data && response.data.tokens && response.data.tokens.access) localStorage.setItem('token', JSON.stringify(response.data.tokens.access.token))
        // window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        {!token &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TextField
              id="outlined-emailText"
              label="Email"
              defaultValue=""
              helperText="Type your email here"
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-passwordText"
              label="Password"
              defaultValue=""
              helperText="Type your password here"
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={() => onLoginSubmit()}>Login</Button>
          </Box>
        }
        {token &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TextField
              id="outlined-titleText"
              label="Title"
              defaultValue=""
              helperText="Type your title here"
              type='text'
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-descriptionText"
              label="Description"
              defaultValue=""
              helperText="Type your description here"
              type='text'
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="priority-select">Priority</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select-input"
                value={priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value={'low'}>Low</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-dueDateText"
              label="Due Date"
              defaultValue=""
              helperText="Type your due Date here"
              type='text'
              onChange={(e) => setDueDate(e.target.value)}
            />
            <Button variant="contained" onClick={() => onTodoSubmit()}>Create Todo</Button>

            <Box mt={2}>
              {todos && todos.length && todos.map((i, idx) => {
                return <p>{i.title}</p>
              })}
            </Box>

          </Box>
        }
      </Box>
    </div>
  );
}

export default App;
