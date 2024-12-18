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

const app = express ();
app.use(bodyParser.json());

dotenv.config();

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