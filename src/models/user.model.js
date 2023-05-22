const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      minlength: [3, 'Name should be at least 3 characters long.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: function (value) {
          // Basic email format validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: (props) => `${props.value} is not a valid email address.`
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
