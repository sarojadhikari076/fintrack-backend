const { config } = require('../config/app')

const nodemailer = require('nodemailer')

async function sendBudgetAlertEmail(user, remainingBudget) {
  try {
    const transporter = nodemailer.createTransport({
      // Configure the email transport options
      service: config.mail.service,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass
      }
    })

    const mailOptions = {
      from: config.mail.from,
      to: user.email,
      subject: 'Budget Alert',
      html: `
        <h1>Dear ${user.name},</h1>
        <p>Your budget is getting low. Please take a look at your finances.</p>
        <p>Remaining budget: $${remainingBudget}</p>
        <p>Thank you.</p>
      `
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = { sendBudgetAlertEmail }
