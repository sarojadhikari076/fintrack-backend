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
      password: await bcrypt.hash('Password@123', 10)
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
      },
      {
        user: user._id,
        name: 'Groceries',
        price: 50.25,
        category: 'Food',
        remarks: 'Weekly grocery shopping'
      },
      {
        user: user._id,
        name: 'Movie ticket',
        price: 12.5,
        category: 'Entertainment',
        remarks: 'Watched a new release'
      },
      {
        user: user._id,
        name: 'Gas bill',
        price: 30.75,
        category: 'Utilities',
        remarks: 'Monthly gas bill payment'
      },
      {
        user: user._id,
        name: 'Restaurant dinner',
        price: 65.0,
        category: 'Food',
        remarks: 'Celebrated a special occasion'
      },
      {
        user: user._id,
        name: 'Clothing',
        price: 45.99,
        category: 'Shopping',
        remarks: 'Bought new summer clothes'
      },
      {
        user: user._id,
        name: 'Gym membership',
        price: 80.0,
        category: 'Fitness',
        remarks: 'Monthly gym subscription'
      },
      {
        user: user._id,
        name: 'Mobile phone bill',
        price: 45.5,
        category: 'Utilities',
        remarks: 'Monthly phone bill payment'
      },
      {
        user: user._id,
        name: 'Concert ticket',
        price: 75.0,
        category: 'Entertainment',
        remarks: 'Attended a live concert'
      },
      {
        user: user._id,
        name: 'Coffee',
        price: 4.75,
        category: 'Food',
        remarks: 'Bought coffee on the way to work'
      },
      {
        user: user._id,
        name: 'Books',
        price: 22.99,
        category: 'Shopping',
        remarks: 'Purchased new novels'
      },
      {
        user: user._id,
        name: 'Car wash',
        price: 15.0,
        category: 'Automotive',
        remarks: 'Got the car cleaned'
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
