const express = require('express')
<<<<<<< HEAD
const path = require('path')
const fs = require('fs')
const cors = require('cors')
=======
const cors = require('cors')
const fs = require('fs')
const path = require('path')
>>>>>>> 07
const corsOptions = require('./config/corsOptions')

const PORT = 3500

<<<<<<< HEAD
let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' })).todos
let ID = data[data.length - 1].id
const required = ['userId', 'title', 'completed']
=======
let { posts, users } = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' }))
let POSTID = 100
>>>>>>> 07

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

<<<<<<< HEAD
app.get('/todos', (req, res) => {
  try {
    return res.status(200).send(data)
=======
app.get('/', (req, res) => {
  try {
    return res.status(200).send({ users, posts })
>>>>>>> 07
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

<<<<<<< HEAD
app.post('/todos', (req, res) => {
  try {
    for (const field of required) {
      if (!(field in req.body)) {
        return res.status(400).send(`400 Bad request: Request body must include '${field}' field.`)
      }
    }

    data = [...data, {...req.body, id: ++ID}]
    return res.status(201).send(req.body)
=======
app.get('/users', (req, res) => {
  try {
    return res.status(200).send(users)
>>>>>>> 07
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

<<<<<<< HEAD
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
=======
app.get('/posts', (req, res) => {
  try {
    if (!req.query?.userId) {
      return res.status(200).send(posts)
    } else {
      const userPosts = posts.filter((post) => post.userId === Number(req.query.userId))
      return res.status(200).send(userPosts)
    }
>>>>>>> 07
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

<<<<<<< HEAD
app.delete('/todos/:id', (req, res) => {
  try {
    if (!data.find((todo) => todo.id === Number(req.params.id))) {
      return res.status(400).send(`400 Bad request: No post with Id ${req.params.id}`)
    }
    data = data.filter((todo) => todo.id !== Number(req.params.id))
=======
app.post('/posts', (req, res) => {
  try {
    posts = [...posts, { ...req.body, id: ++POSTID }]
    return res.status(201).send(posts)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.put('/posts/:id', (req, res) => {
  try {
    filtered = posts.filter((post) => post.id !== Number(req.params.id))
    posts = [...filtered, req.body]
    return res.status(201).send(posts)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.delete('/posts/:id', (req, res) => {
  try {
    posts = posts.filter((post) => post.id !== req.body.id)
>>>>>>> 07
    return res.sendStatus(204)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

<<<<<<< HEAD
=======
app.patch('/posts/:id', (req, res) => {
  try {
    const target = posts.find((post) => post.id === Number(req.params.id))
    const index = posts.indexOf(target)
    posts[index] = { ...target, ...req.body }
    return res.status(201).send(posts)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

>>>>>>> 07
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
