const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const corsOptions = require('./config/corsOptions')

const PORT = 3500

let { posts, users } = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'db.json'), { encoding: 'utf-8' }))
let POSTID = 100

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

app.get('/', (req, res) => {
  try {
    return res.status(200).send({ users, posts })
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.get('/users', (req, res) => {
  try {
    return res.status(200).send(users)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.get('/posts', (req, res) => {
  try {
    if (!req.query?.userId) {
      return res.status(200).send(posts)
    } else {
      const userPosts = posts.filter((post) => post.userId === Number(req.query.userId))
      return res.status(200).send(userPosts)
    }
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.post('/posts', (req, res) => {
  try {
    posts = [...posts, { ...req.body, id: ++POSTID }]
    return res.status(201).send(posts)
  } catch (err) {
    return res.status(500).send('500 Server error: ' + err.message)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
