const jwt = require('jsonwebtoken')
const asyncWrapper = require('../utils/asyncWrapper')
const { config } = require('../config/app')

const authenticate = asyncWrapper(async (req, _, next) => {
  let token = req.headers.authorization

  if (!token) {
    return next({ message: 'Authorization token missing', statusCode: 401 })
  }

  token = token.split(' ')[1]

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.secretKey)

    // Attach the user ID to the request object for further use
    req.userId = decoded.userId

    next()
  } catch (error) {
    console.log(error)
    next({ message: 'Invalid token', statusCode: 401 })
  }
})

module.exports = authenticate
