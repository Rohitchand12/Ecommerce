const express = require("express");
const authRouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoute");
const globalErrorHandler = require('./middlewares/errorMiddleware/globalErrorHandler');
const AppError = require("./utils/appError");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp');

//instantiating app
const app = express();


//GLOBAL MIDDLEWARES

// app.use(express.json({limit:'10kb'})) can be used to limit body data
app.use(express.json()); //parsing data from body
app.use(helmet()) // security http headers


const limiter = rateLimit({
    max:100, //100 requests per 15 minutes
    windowMs : 15*60*60*1000, //15 min window
    message:'Too many requests , please try again later'
})

app.use('/api',limiter); // rate limiting

//Data sanitization
app.use(mongoSanitize()); //nosql injection

app.use(hpp()) // handling parameter pollution
//in order to allow duplicate parameter properties , whitelist the properties
// app.use(hpp({
//     whitelist:[
//         duration , ...
//     ]
// }))


//Mounting routes middleware

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);


// handling random routes error

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

//error handling middleware

app.use(globalErrorHandler);

module.exports = app;
