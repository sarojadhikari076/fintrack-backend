const User = require('../models/user.model')
const asyncWrapper = require('../utils/asyncWrapper')

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find()

  res
    .status(200)
    .json({ ok: true, message: 'Users fetched successfully', users })
})

module.exports = {
  getUsers
}
