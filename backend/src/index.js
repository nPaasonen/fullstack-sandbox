const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// initial todo lists in storage
var todoLists = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: ['First todo of first list!', 'second!'],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: ['First todo of second list!'],
  },
}

app.get('/todos', (req, res) => res.status(200).send(todoLists))

app.post('/todos/:id', (req, res) => {
  const { id } = req.params
  const { todos } = req.body

  if (!Object.keys(todoLists).includes(id))
    return res.status(404).send("ToDo List with id don't exist")
  if (!todos) 
    return res.status(300).send('ToDo List undefined')

  todoLists[id].todos = todos

  res.status(200).send(todoLists[id])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
