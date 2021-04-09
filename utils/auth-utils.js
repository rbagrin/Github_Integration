const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const AuthUtils = {

  getUser: function (req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
      try {
        const token = bearerHeader.split(' ')[1]
        const user = jwt.verify(token, secretKey)
        const username = user.username
        const role = user.role
        req.user = { username, role }
      } catch (error) {
        return res.status(401).send('Wrong token')
      }
      return next()
    }
    res.status(401).send('Missing token')
  },

  authorizeRole: function (role) {
    return (req, res, next) => {
      if (role === req.user.role) {
        return next()
      }
      res.status(403).send('Unauthorized')
    }
  }
}

module.exports = AuthUtils
