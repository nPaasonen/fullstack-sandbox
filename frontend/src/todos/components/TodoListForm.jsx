import React, { useState, useEffect} from 'react'
import { TextField, Card, Checkbox, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import moment from 'moment'
import { DatePick } from '../DatePick'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  // autosave
  useEffect(() => {
    saveTodoList(todoList.id, {todos})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos])

  const handleChange = (text, done, date, i) => {
    const newTodo = {text, done, date}
    setTodos([
      ...todos.slice(0, i),
      newTodo,
      ...todos.slice(i + 1)
    ])
  }

  const isAllTodosCompleted = (list) => {
    return list.length && list.every(i => i.done)
  }

  return (
    <Card sx={{ margin: '0 1rem', border: "2px solid", borderColor: isAllTodosCompleted(todos) ? "#bbe077" : "white"}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title + ": "} 
          {todos.filter(t => t.done).length + "/" + todos.length} 
          {isAllTodosCompleted(todos) ? " ✅" : ""}
        </Typography>
        <form
          onSubmit={(event) => event.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: 15, background: todo.done ? "#edffcc" : "white", marginTop: 10 }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1} 
              </Typography>
              <Checkbox
                color="success"
                checked={todo.done}
                onChange={() => handleChange(todo.text, !todo.done, todo.date, index)}
              />
              <TextField
                sx={{ width: "100%", }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => handleChange(event.target.value, todo.done, todo.date, index)}
              />
              <DatePick 
                todo={todo} 
                handleChange={(newDate) => handleChange(todo.text, todo.done, newDate, index)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {text: "", done: false, date: moment().add(1,'days')}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
