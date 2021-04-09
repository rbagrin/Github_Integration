const express = require('express')
const router = express.Router()
const db = require('../db/models')
const axios = require('axios')
const authUtils = require('../utils/auth-utils')

router.get('/', authUtils.authorizeRole('admin'), (req, res) => {
  res.send('Hello World from API!')
})

router.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  res.send({ count: users.length, users })
})

router.get('/credentials', async (req, res) => {
  const credentials = await db.Credentials.findAll()
  res.send({ count: credentials.length, credentials })
})

router.post('/users', async (req, res) => {
  const payload = req.body
  await db.User.create({
    username: payload.username,
    password: payload.password
  })
  res.send()
})

router.post('/credentials', async (req, res) => {
  const payload = req.body
  await db.Credentials.create({
    appName: payload.appName,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken
  })
  res.send()
})

router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId

  await db.User.destroy({
    where: {
      id: userId
    }
  })
  res.status(204).send()
})

router.delete('/credentials/:credentialsId', async (req, res) => {
  const credentialsId = req.params.credentialsId

  await db.Credentials.destroy({
    where: {
      id: credentialsId
    }
  })
  res.status(204).send()
})

router.get('/github/test-request', async (req, res) => {
  const githubClient = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/json'
    }
  })

  const octocat = (await githubClient.get('/users/octocat')).data

  res.send(octocat)
})

/**
 * TODO:
 *  - routes for handling authorization
 *  - save obtained credentials in db
 *  - routes to get the asked data from github api using the stored credentials
 */

module.exports = router
