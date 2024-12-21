import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import authRoute from "./routes/authenticationRoute.js"
import { authenticateJWT } from "./libs/jwtFilter.js";
import schoolRoute from "./routes/schoolRoute.js";
import entityMappingRoute from "./routes/entityMappingRoute.js"
import classRoute from "./routes/classRoute.js"
import studentRoute from "./routes/studentRoute.js"
import rateLimit from "express-rate-limit"

const app = express ();
app.use(bodyParser.json());
dotenv.config();
const RATE_TIME_LIMIT = process.env.RATE_TIME_LIMIT || 15 * 60 * 1000;
const MAX_HIT = process.env.MAX_HIT || 10;
console.log(RATE_TIME_LIMIT, MAX_HIT);
const limiter = rateLimit({
    windowMs: RATE_TIME_LIMIT, // 15 minutes
    max: MAX_HIT, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
    handler: (req, res, next, options) => {
        // Custom response when rate limit is exceeded
        return res.status(429).json({
            statusCode: 429,
            message: "Too many requests. Please try again later.",
            data: null
        });
    }
    
})
// Apply rate limiter to all routes
app.use(limiter);

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL; 

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected Successfully.")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
}).catch(error => console.log(error));


app.use("/sms/user", authenticateJWT, route)
app.use("/sms/school", authenticateJWT, schoolRoute)
app.use("/sms/class", authenticateJWT, classRoute)
app.use("/sms/student", authenticateJWT, studentRoute)
app.use("/sms/map", authenticateJWT, entityMappingRoute)
app.use("/sms/auth", authRoute)