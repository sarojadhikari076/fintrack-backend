const asyncWrapper = require('../utils/asyncWrapper')
const FinancePlan = require('../models/finance.model')

const upsertFinancePlan = asyncWrapper(async (req, res) => {
  const { income, savings, investments } = req.body

  const financePlanFields = {
    user: req.userId,
    income,
    expenseBudget: income - savings - investments,
    savings,
    investments
  }

  // Validate that expense budget, investments, and savings do not exceed income
  if (savings + investments > income) {
    return next({
      message: 'Expense budget, investments, and savings cannot exceed income',
      statusCode: 400
    })
  }

  // Find the finance plan associated with the user and update it if found, or create a new finance plan
  const financePlan = await FinancePlan.findOneAndUpdate(
    { user: req.userId },
    financePlanFields,
    { new: true, upsert: true }
  )

  res.status(200).json({
    financePlan,
    ok: true,
    message: 'Finance plan updated successfully'
  })
})

const getFinancePlan = asyncWrapper(async (req, res, next) => {
  const financePlan = await FinancePlan.findOne({ user: req.userId })

  if (!financePlan) {
    return next({ message: 'Finance plan not found', statusCode: 404 })
  }

  res.status(200).json({
    financePlan,
    ok: true,
    message: 'Finance plan fetched successfully'
  })
})

const deleteFinancePlan = asyncWrapper(async (req, res, next) => {
  const deletedFinancePlan = await FinancePlan.findOneAndRemove({
    user: req.userId
  })

  if (!deletedFinancePlan) {
    return next({ message: 'Finance plan not found', statusCode: 404 })
  }

  res
    .status(200)
    .json({ message: 'Finance plan deleted successfully', ok: true })
})

module.exports = {
  upsertFinancePlan,
  getFinancePlan,
  deleteFinancePlan
}
