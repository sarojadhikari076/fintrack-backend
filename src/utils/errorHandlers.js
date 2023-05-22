const { config } = require('../config/app')

function notFoundHandlers(req, _, next) {
  const error = new Error(`API path ${req.originalUrl} not found`)
  error.statusCode = 404
  next(error)
}

function globalErrorHandlers(error, _, res, next) {
  const { fieldname, statusCode, message, stack } = error
  res.status(statusCode || 500).json({
    ok: false,
    error: true,
    fieldname,
    message: message ?? 'Server Error',
    stack: config.isDev ? stack : undefined
  })
  next()
}

module.exports = {
  notFoundHandlers,
  globalErrorHandlers
}
