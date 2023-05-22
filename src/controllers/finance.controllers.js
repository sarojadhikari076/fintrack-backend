function getFinancePlan(req, res) {
  res.status(200).json({ ok: true, message: 'Finance fetched successfully' })
}

module.exports = {
  getFinancePlan
}
