class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // using this we already set the message property using parent class constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // only for operational errors , that we can predict

    Error.captureStackTrace(this, this.constructor); // track the error
  }
}

module.exports = AppError;
