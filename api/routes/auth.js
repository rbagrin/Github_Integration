const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db/models')

const privateKey = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  // Search for the user with the providen email
  const user = await db.User.findOne({ where: { username, password } })

  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, privateKey)
    return res.json({ token })
  }

  return res.json({ error: 'Wrong username or password.' })
})

router.get('/login', async (req, res) => {
  res.send('It works')
})

module.exports = router
