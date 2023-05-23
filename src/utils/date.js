// Helper function to generate date filter based on the provided date parameter
const getDateFilter = (date) => {
  const today = new Date()
  const fromDate = new Date()

  switch (date) {
    case 'MONTH':
      fromDate.setMonth(today.getMonth() - 1)
      break
    case 'WEEK':
      fromDate.setDate(today.getDate() - 7)
      break
    case 'DAY':
      fromDate.setDate(today.getDate())
      break
    default:
      break
  }

  return { $gte: fromDate }
}

module.exports = { getDateFilter }
