const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { config } = require('./src/config/app')
const User = require('./src/models/user.model')
const FinancePlan = require('./src/models/finance.model')
const Expenditure = require('./src/models/expenditure.model')

async function seed() {
  try {
    await mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      FinancePlan.deleteMany({}),
      Expenditure.deleteMany({})
    ])

    // Create a sample user
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('password', 10)
    })
    await user.save()

    // Create a finance plan for the user
    const financePlan = new FinancePlan({
      user: user._id,
      income: 5000,
      expenseBudget: 2000,
      savings: 1000,
      investments: 1000
    })
    await financePlan.save()

    // Create sample expenditures
    const expenditures = [
      {
        user: user._id,
        name: 'Groceries',
        price: 100,
        category: 'Food',
        remarks: 'Weekly grocery shopping'
      },
      {
        user: user._id,
        name: 'Rent',
        price: 1500,
        category: 'Housing',
        remarks: 'Monthly rent payment'
      },
      {
        user: user._id,
        name: 'Dinner',
        price: 50,
        category: 'Food',
        remarks: 'Eating out with friends'
      }
    ]

    await Expenditure.insertMany(expenditures)

    console.log('Seed data has been inserted successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
