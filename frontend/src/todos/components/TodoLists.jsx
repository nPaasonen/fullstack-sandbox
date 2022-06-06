import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    const fetchTodos = () => {
      fetch('http://localhost:3001/todos')
        .then((res) => res.json())
        .then((data) => {
          setTodoLists(data)
        })
    }
    fetchTodos()
  }, [])

  const saveTodoList = async (id, { todos }) => {
    const listToUpdate = todoLists[id]
    setTodoLists({
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    })

    await fetch('http://localhost:3001/todos/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todos }),
    })
  }

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, todos) => saveTodoList(id, todos)}
        />
      )}
    </Fragment>
  )
}
