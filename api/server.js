const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const apiRoutes = require('./routes')
const authRoutes = require('./routes/auth')
const authUtils = require('./utils/auth-utils')

const app = express()
const PORT = process.env.PORT || 5000

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

// TODO: @rbagrin - make debug routes accessible without needing to login

// AUTH routes
app.use('/auth', authRoutes)

// parse JWT middleware
app.use(authUtils.getUser)

// API routes
app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`Test app listening on port ${PORT}`)
})
