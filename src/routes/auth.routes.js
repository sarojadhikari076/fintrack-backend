const { register, login, getMe } = require('../controllers/auth.controllers')
const authenticate = require('../middlewares/auth.middlewares')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authenticate, getMe)

module.exports = router
