const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncWrapper = require('../utils/asyncWrapper')
const User = require('../models/user.model')
const { config } = require('../config/app')

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body

  // Check if the user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next({
      message: 'User with given email already exists',
      statusCode: 400
    })
  }

  // Create a new user
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    name,
    email,
    password: hashedPassword
  })
  await user.save()

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, config.secretKey, {
    expiresIn: config.jwtTtl
  })

  res
    .status(201)
    .json({ ok: true, message: 'User registered successfully', user, token })
})

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body

  // Check if the user exists
  const user = await User.findOne({ email }).select('name email password')
  if (!user) {
    return next({ message: 'Invalid email or password', statusCode: 401 })
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return next({ message: 'Invalid email or password', statusCode: 401 })
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, config.secretKey, {
    expiresIn: config.jwtTtl
  })

  res
    .status(200)
    .json({ ok: true, token, user, message: 'User signed in successfully' })
})

const getMe = asyncWrapper(async (req, res) => {
  const { userId } = req

  const user = await User.findById(userId)

  if (!user) {
    return next({
      message: 'User not found',
      statusCode: 404
    })
  }

  res
    .status(200)
    .json({ ok: true, user, message: 'Fetched your data successfully' })
})

module.exports = { register, login, getMe }
