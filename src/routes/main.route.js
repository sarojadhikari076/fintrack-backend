const router = require('express').Router()
const financeRouter = require('./finance.routes')
const expenseRouter = require('./expenditure.routes')
const userRouter = require('./user.routes')
const authRouter = require('./auth.routes')
const authenticate = require('../middlewares/auth.middlewares')

router.use('/auth', authRouter)

router.use(authenticate)

router.use('/users', userRouter)
router.use('/finances', financeRouter)
router.use('/expenditures', expenseRouter)

module.exports = router
