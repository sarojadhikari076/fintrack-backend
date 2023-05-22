const mongoose = require('mongoose')

const expenditureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.']
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be at least 0.']
    },
    category: {
      type: String,
      required: [true, 'Category is required.']
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
)

const Expenditure = mongoose.model('Expenditure', expenditureSchema)

module.exports = Expenditure
