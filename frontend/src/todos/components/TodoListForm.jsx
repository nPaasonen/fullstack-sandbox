import React from 'react'
import { TextField, Card, Checkbox, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import moment from 'moment'
import { DatePick } from '../DatePick'

export const TodoListForm = ({ todoList, saveTodoList }) => {

  const handleChange = (text, done, date, i) => {
    const newTodo = {text, done, date}
    const todos = [
      ...todoList.todos.slice(0, i),
      newTodo,
      ...todoList.todos.slice(i + 1)
    ]
    saveTodoList({todos})
  }

  const isAllTodosCompleted = (todos) => {
    return todos.length && todos.every(todo => todo.done)
  }

  return (
    <Card sx={{ margin: '0 1rem', border: "2px solid", borderColor: isAllTodosCompleted(todoList.todos) ? "#bbe077" : "white"}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title + ": "} 
          {todoList.todos.filter(t => t.done).length + "/" + todoList.todos.length} 
          {isAllTodosCompleted(todoList.todos) ? " ✅" : ""}
        </Typography>
        <form
          onSubmit={(event) => event.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}
        >
          {todoList.todos.map((todo, index) => (
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
                date={todo.date}
                done={todo.done}
                handleChange={(newDate) => handleChange(todo.text, todo.done, newDate, index)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  saveTodoList(
                   { 
                     todos: [
                      // immutable delete
                      ...todoList.todos.slice(0, index),
                      ...todoList.todos.slice(index + 1),
                    ] 
                  })
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
                saveTodoList({todos: [...todoList.todos, {text: "", done: false, date: moment().add(1,'days')}]})
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
