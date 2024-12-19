import express from "express"
import { create, deleteUser, fetch, update } from "../controller/userController.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import Roles from "../enums/roles.js";
import { validateRequest } from "../mws/requestValidator.js"
import createUserSchema from "../mws/createUserSchema.js"
import { validateParams } from "../mws/paramValidator.js"
import paramSchema from "../mws/paramSchema.js"

const route = express.Router();

route.get("/getallusers", authorizeRole([Roles.SUPER_ADMIN]), fetch)
route.post ("/create", authorizeRole([Roles.SUPER_ADMIN]), validateRequest(createUserSchema), create)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN]), validateParams(paramSchema), validateRequest(createUserSchema), update)
route.delete("/delete/:id", authorizeRole([Roles.SUPER_ADMIN]), validateParams(paramSchema), deleteUser)

export default route;