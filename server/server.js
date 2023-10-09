const express = require('express')
const path = require('path')
const fsp = require('fs').promises
const fs = require('fs')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = 3500

let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' })).todos

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

// app.use(async (req, res, next) => {
//   data = JSON.parse(await fsp.readFile(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' })).todos
//   next()
// })

app.get('/todos', (req, res) => {
  try {
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send('500 Server error: ' + err.message)
  }
})

app.post('/todos', (req, res) => {
  try {
    data = [req.body, ...data]
    res.status(201).send(req.body)
  } catch (err) {
    res.status(500).send('500 Server error: ' + err.message)
  }
})

app.patch('/todos/:id', (req, res) => {
  try {
    const todo = data.find((t) => t.id === Number(req.params.id))
    data[data.indexOf(todo)] = { ...todo, ...req.body }
    res.status(201).send({ ...todo, ...req.body })
  } catch (err) {
    res.status(500).send('500 Server error: ' + err.message)
  }
})

app.delete('/todos/:id', (req, res) => {
  try {
    data = data.filter((todo) => todo.id !== Number(req.params.id))
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send('500 Server error: ' + err.message)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
