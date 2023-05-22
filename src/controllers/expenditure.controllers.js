const asyncWrapper = require('../utils/asyncWrapper')
const Expenditure = require('../models/expenditure.model')
const FinancePlan = require('../models/finance.model')

const createExpenditure = asyncWrapper(async (req, res, next) => {
  const { name, price, category, remarks } = req.body
  const userId = req.userId

  // Find the finance plan associated with the user
  const financePlan = await FinancePlan.findOne({ user: userId })

  if (!financePlan) {
    return next({ message: 'Finance plan not found', statusCode: 404 })
  }

  // Calculate the remaining expense budget after deducting the expenditure
  const remainingBudget = financePlan.expenseBudget - price

  if (remainingBudget < 0) {
    return next({
      message: 'Expenditure exceeds expense budget',
      statusCode: 400
    })
  }

  const expenditure = new Expenditure({
    user: userId,
    name,
    price,
    category,
    remarks
  })

  const createdExpenditure = await expenditure.save()

  // Update the expense budget in the finance plan
  financePlan.expenseBudget = remainingBudget
  await financePlan.save()

  res.status(201).json({
    ok: true,
    message: 'Expenditure created successfully',
    expenditure: createdExpenditure
  })
})

const getExpenditures = asyncWrapper(async (req, res) => {
  const { userId } = req

  const expenditures = await Expenditure.find({ user: userId })

  res.status(200).json({
    ok: true,
    message: 'Expenditures retrieved successfully',
    expenditures
  })
})

const getExpenditure = asyncWrapper(async (req, res, next) => {
  const { expenditureId } = req.params

  const expenditure = await Expenditure.findById(expenditureId)

  if (!expenditure) {
    return next({ message: 'Expenditure not found', statusCode: 404 })
  }

  res.status(200).json({
    ok: true,
    message: 'Expenditure retrieved successfully',
    expenditure
  })
})

const deleteExpenditure = asyncWrapper(async (req, res, next) => {
  const { expenditureId } = req.params

  // Find the expenditure by ID
  const expenditure = await Expenditure.findOne({
    _id: expenditureId,
    user: req.userId
  })

  if (!expenditure) {
    return next({ message: 'Expenditure not found', statusCode: 404 })
  }

  // Update the expense budget in the finance plan by adding the expenditure price back
  const financePlan = await FinancePlan.findOneAndUpdate(
    { user: req.userId },
    { $inc: { expenseBudget: expenditure.price } },
    { new: true }
  )

  await expenditure.remove()

  res.status(200).json({
    ok: true,
    message: 'Expenditure deleted successfully',
    financePlan
  })
})

const updateExpenditure = asyncWrapper(async (req, res, next) => {
  const { expenditureId } = req.params

  const expenditure = await Expenditure.findOneAndUpdate(
    {
      _id: expenditureId,
      user: req.userId
    },
    { ...req.body },
    { new: true }
  )

  if (!expenditure) {
    return next({ message: 'Expenditure not found', statusCode: 404 })
  }

  // Calculate the difference in price
  const priceDifference = req.body.price - expenditure.price

  // Update the expense budget in the finance plan by adding the price difference
  const financePlan = await FinancePlan.findOneAndUpdate(
    { user: req.userId },
    { $inc: { expenseBudget: priceDifference } },
    { new: true }
  )

  res.status(200).json({
    ok: true,
    message: 'Expenditure updated successfully',
    expenditure: updatedExpenditure,
    financePlan
  })
})

module.exports = {
  createExpenditure,
  getExpenditures,
  getExpenditure,
  updateExpenditure,
  deleteExpenditure
}
