const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = 3500

let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' })).todos
let ID = data[data.length - 1].id
const required = ['userId', 'title', 'completed']

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

app.get('/todos', (req, res) => {
  try {
    return res.status(200).send(data)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.post('/todos', (req, res) => {
  try {
    for (const field of required) {
      if (!(field in req.body)) {
        return res.status(400).send(`400 Bad request: Request body must include '${field}' field.`)
      }
    }

    data = [...data, {...req.body, id: ++ID}]
    return res.status(201).send(req.body)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.patch('/todos/:id', (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send('400 Bad request: No field to update.')
    }

    for (const field of Object.keys(req.body)) {
      if (required.indexOf(field) === -1 && field !== 'id') {
        return res.status(400).send(`400 Bad request: No field '${field}' avalible to update`)
      }
    }

    const todo = data.find((t) => t.id === Number(req.params.id))

    if (!todo) {
      return res.status(400).send(`400 Bad request: No post with Id ${req.params.id}`)
    }

    data[data.indexOf(todo)] = { ...todo, ...req.body }
    return res.status(201).send({ ...todo, ...req.body })
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.delete('/todos/:id', (req, res) => {
  try {
    if (!data.find((todo) => todo.id === Number(req.params.id))) {
      return res.status(400).send(`400 Bad request: No post with Id ${req.params.id}`)
    }
    data = data.filter((todo) => todo.id !== Number(req.params.id))
    return res.sendStatus(204)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
