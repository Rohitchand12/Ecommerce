import express from "express";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoute.js";
import shipRouter from "./routes/shipping.Routes.js";
import paymentRouter from "./routes/payment.router.js";
import categoryRouter from "./routes/categoryRoutes.js";
import globalErrorHandler from "./middlewares/errorMiddleware/globalErrorHandler.js";
import AppError from "./utils/appError.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import morgan from "morgan";
import Razorpay from "razorpay"
import asyncHandler from "./utils/asyncHandler.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY,
  key_secret: process.env.RAZORPAY_TEST_SECRET,
});

//instantiating app
const app = express();
app.use(cookieParser());
app.use(morgan('dev'));

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","https://www.mystickart.online"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    
  })
);
app.use(express.static("/public"));
app.set("view engine", "ejs");

//GLOBAL MIDDLEWARES

// app.use(express.json({limit:'10kb'})) can be used to limit body data
app.use(express.json()); //parsing data from body
app.use(express.urlencoded({extended: true}));
app.use(helmet()); // security http headers

const limiter = rateLimit({
  max: 100, //100 requests per 15 minutes
  windowMs: 15 * 60 * 60 * 1000, //15 min window
  message: "Too many requests , please try again later",
});

app.use("/api", limiter); // rate limiting

//Data sanitization
app.use(mongoSanitize()); //nosql injection

app.use(hpp()); // handling parameter pollution
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
app.use("/api/v1/shipments", shipRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/categories", categoryRouter);
app.get("/", (req, res) => {
  console.log(req.cookies);
  console.log(process.env.NODE_ENV === 'production');
  res.render(path.join(__dirname, "views/resetPassword.ejs"), {
    name: "Rohit Chand",
  });
});
app.get("/api/v1/getkey",asyncHandler(async(req,res)=>{
  res.status(200).json({
    success:true,
    key:process.env.RAZORPAY_TEST_KEY
  })
}))

// handling random routes error

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//error handling middleware

app.use(globalErrorHandler);

export default app;
