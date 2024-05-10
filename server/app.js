const express = require("express");
const authRouter = require('./routes/authRoutes')
const cartRouter = require('./routes/cartRoutes')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
const app = express();

app.use(express.json());

//Mounting routes 
console.log(process.env.NODE_ENV);
 
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/orders',orderRouter);

module.exports = app;
