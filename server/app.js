const express = require("express");
const authRouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoute");
const globalErrorHandler = require('./middlewares/errorMiddleware/globalErrorHandler');
const AppError = require("./utils/appError");
const app = express();

app.use(express.json());

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
