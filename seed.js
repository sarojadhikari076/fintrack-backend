const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { config } = require('./src/config/app')

async function seed() {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Connect to MongoDB
    await mongoose.connect(config.dbUrl, {
      session
    })

    // Clear existing data
    await Promise.all([
      User.deleteMany({}, { session }),
      FinancePlan.deleteMany({}, { session }),
      Expenditure.deleteMany({}, { session })
    ])

    // Create a sample user
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('password', 10)
    })
    await user.save({ session })

    // Create a finance plan for the user
    const financePlan = new FinancePlan({
      user: user._id,
      income: 5000,
      expenseBudget: 2000,
      savings: 1000,
      investments: 1000
    })
    await financePlan.save({ session })

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

    await Expenditure.insertMany(expenditures, { session })

    // Commit the transaction
    await session.commitTransaction()
    console.log('Seed data has been inserted successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)

    // Rollback the transaction
    await session.abortTransaction()
  } finally {
    // End the session
    session.endSession()
  }

  // Disconnect from MongoDB
  await mongoose.disconnect()
}

seed()
