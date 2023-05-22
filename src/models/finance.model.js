const mongoose = require('mongoose')

const financePlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.']
    },
    income: {
      type: Number,
      required: true,
      min: [0, 'Income must be at least 0.'],
      max: [10000, 'Income cannot exceed 10000.']
    },
    expenseBudget: {
      type: Number,
      required: true,
      min: [0, 'Expense budget must be at least 0.'],
      max: [10000, 'Expense budget cannot exceed 10000.']
    },
    savings: {
      type: Number,
      required: true,
      min: [0, 'Savings must be at least 0.'],
      max: [10000, 'Savings cannot exceed 10000.']
    },
    investments: {
      type: Number,
      required: true,
      min: [0, 'Investments must be at least 0.'],
      max: [10000, 'Investments cannot exceed 10000.']
    }
  },
  { timestamps: true }
)

const FinancePlan = mongoose.model('FinancePlan', financePlanSchema)

module.exports = FinancePlan
