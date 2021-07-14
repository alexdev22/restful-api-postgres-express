const express = require('express')
const app = express()
const pool = require('./db')

app.use(express.json())

// Routes //

// get All Todos

app.get('/todos', async (req, res) => {
  const allTodos = await pool.query('SELECT * FROM todo')
  res.send(allTodos.rows)
})

// Get a Todo

app.get('/todos/:id', async (req, res) => {
  const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1 ', [req.params.id])
  res.send(todo.rows)
})

// Create a todo

app.post('/todos', async (req, res) => {
  try {
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1)', [req.body.description])
  } catch (err) {
    console.log(err)
  }
})

// Update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params // Where
    const { description } = req.body // Set
    const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
  } catch (err) {
    console.log(err)
  }
  res.json('Todo Was Updated')
})

// Delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
    res.json('Todo Was Deleted')
  } catch (err) {
    console.log(err)
  }
})

app.listen(3001, () => {
  console.log('Listening on port 3001')
})
