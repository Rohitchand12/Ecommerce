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

/*
  -> This is an extension of the Error class that we will use to generate errors.
  -> Its contructor takes message and statusCode 
  -> isOperational is a feild that will help us know that the error is an operational error .
  -> Basically if we send an error , then isOperational will always be true.
  -> But if it is an error made by mongoose , database or a server error , then we can send a different response.

*/