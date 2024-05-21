import express from "express";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoute.js";
import globalErrorHandler from './middlewares/errorMiddleware/globalErrorHandler.js';
import AppError from "./utils/appError.js";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from "cookie-parser";

//instantiating app
const app = express();
app.use(express.static('/public'));


//GLOBAL MIDDLEWARES

// app.use(express.json({limit:'10kb'})) can be used to limit body data
app.use(cookieParser());
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

export default app;
