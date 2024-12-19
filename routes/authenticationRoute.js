import express from "express"
import { login } from "../controller/authenticationController.js";
import { validateRequest } from "../mws/requestValidator.js"
import loginSchema from "../mws/loginSchema.js"

const route = express.Router();

route.post ("/login", validateRequest(loginSchema), login)

export default route;