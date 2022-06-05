import React, { useState } from 'react'
import { TextField, Card, Checkbox, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const isAllTodosCompleted = (list) => {
    return list.every(i => i.done)
  }

  return (
    <Card sx={{ margin: '0 1rem', border: "2px solid", borderColor: isAllTodosCompleted(todos) ? "#bbe077" : "white"}}>
      <CardContent>
        <Typography component='h2'>{todoList.title} {isAllTodosCompleted(todos) ? "✅" : ""}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: 15, background: todo.done ? "#edffcc" : "white", marginTop: 10 }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1} 
              </Typography>
              <Checkbox
                checked={todo.done}
                onChange={() => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {text: todo.text, done: !todo.done},
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <TextField
                sx={{ flexGrow: 1, }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {text: event.target.value, done: todo.done},
                    ...todos.slice(index + 1),
                  ])
                }}
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
                setTodos([...todos, {text: "", done: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
