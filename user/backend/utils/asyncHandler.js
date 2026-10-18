// Wraps async controllers so any error goes to the error handler
module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);