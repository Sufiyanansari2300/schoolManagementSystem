import express from "express"
import { login } from "../controller/authenticationControler.js";

const route = express.Router();

route.post ("/login",login)

export default route;