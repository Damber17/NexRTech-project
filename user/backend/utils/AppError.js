// Use in controllers: throw new AppError(404, "NOT_FOUND", "Basket not found")
class AppError extends Error {
  constructor(status, code, message, extra = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.extra = extra; // e.g. { attempts_left: 3 }
  }
}
module.exports = AppError;