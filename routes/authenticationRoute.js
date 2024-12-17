import express from "express"
import { login } from "../controller/authenticationController.js";

const route = express.Router();

route.post ("/login",login)

export default route;