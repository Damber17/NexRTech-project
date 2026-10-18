// Central error handler
const AppError = require("../utils/AppError");

exports.notFound = (req, res) => {
  res.status(404).json({ message: "Route not found", code: "NOT_FOUND" });
};

exports.errorHandler = (err, req, res, next) => {
  // Our own errors
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message, code: err.code, ...err.extra });
  }
  // zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      errors: err.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
    });
  }
  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      errors: Object.values(err.errors).map((e) => ({ field: e.path, message: e.message })),
    });
  }
  // Bad id format in the URL
  if (err.name === "CastError") {
    return res.status(404).json({ message: "Not found", code: "NOT_FOUND" });
  }
  // Duplicate value (e.g. email already used)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({ message: `${field} already exists`, code: "DUPLICATE_VALUE" });
  }
  // Login token problems
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Session expired", code: "TOKEN_EXPIRED" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Not logged in", code: "UNAUTHENTICATED" });
  }
  // Anything else is our bug: log it, but don't show details to the user
  console.error(err);
  res.status(500).json({ message: "Something went wrong", code: "SERVER_ERROR" });
};