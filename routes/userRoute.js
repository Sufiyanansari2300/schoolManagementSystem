import express from "express"
import { create, deleteUser, fetch, update } from "../controller/userController.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import Roles from "../enums/roles.js";

const route = express.Router();

route.get("/getallusers", authorizeRole([Roles.SUPER_ADMIN]), fetch)
route.post ("/create", authorizeRole([Roles.SUPER_ADMIN]), create)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN]), update)
route.delete("/delete/:id", authorizeRole([Roles.SUPER_ADMIN]), deleteUser)

export default route;