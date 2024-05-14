const AppError = require("../../utils/appError");

//more descriptive error for development environment
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    success: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// client friendly error for production environment
const sendProdError = (err, res) => {
  //if error is something that we expected or a trusted error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: err.status,
      message: err.message,
    });
  }
  // or else the error is internal , maybe database or server or unknown
  else {
    console.log("Error 🔥💣", err);
    res.status(500).json({
      success: "error",
      message: "Something went wrong",
    });
  }
};

//handling error for invalid database id
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

//handling duplicate feilds
const handleDuplicateFeildsDb = (err) => {
  const errorAt = Object.keys(err.keyValue)[0]; //reference to error message is below
  const value = err.keyValue[errorAt]; 
  const message = `Duplicate key ${errorAt} : ${value}}`;
  return new AppError(message, 400);
};

//handling Schema validation error
const handleValidationError=(err)=>{
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data . ${errors.join('. ')}`
    return new AppError(message,400);
}

//handling JWT invaldation error
const handleJWTError = ()=>{
  const message = "Invalid token , please login again"
  return new AppError(message,401);
}

//handling JWT expiration error
const handleJWTExpired = ()=>{
  return new AppError('Session has expired , please login again',401)
}

//error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    // development error messaage
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production ") {
    //production error message

    let error = { ...err };

    // If invalid db Id it is not by default operational error so we have to make it operational
    // we do it by using CastError name , because this is the name of error on wrong id
    // inside handleCastErrorDb we use AppError class to make it an operational error that we made
    // otherwise in production it would show something went wrong
    // but we want to show that user entered invalid id

    if (err.name === "CastError") error = handleCastErrorDB(error);

    // If duplicate key is entered by user for unique feildname
    //err.code for this is 11000
    if (err.code === 11000) error = handleDuplicateFeildsDb(error);


    // if user enters data that breaches the validation rules of schema
    if(err.name === "ValidationError") error = handleValidationError(error);


    //if JWT is invalid
    if(err.name === 'JsonWebTokenError') error = handleJWTError();

    //if JWT expired
    if(err.name === 'TokenExpiredError') error = handleJWTExpired();

    sendProdError(error, res);
  }
};

/*
    Any error created and passed in next() will reach this error handling middleware.
*/

//Duplicate error message

// "error": {
//     "errorResponse": {
//         "index": 0,
//         "code": 11000,
//         "errmsg": "E11000 duplicate key error collection: Ecommerce_db.products index: title_1 dup key: { title: \"Dummy Product\" }",
//         "keyPattern": {
//             "title": 1
//         },
//         "keyValue": {
//             "title": "Dummy Product"
//         }
//     },
//     "index": 0,
//     "code": 11000,
//     "keyPattern": {
//         "title": 1
//     },
//     "keyValue": {
//         "title": "Dummy Product"
//     },
//     "statusCode": 500,
//     "status": "error"
// }