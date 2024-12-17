import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { create, fetch, fetchById, update, deleteSchool } from "../controller/schoolController.js";


const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN]), create)
route.get("/getSchools", authorizeRole([Roles.SUPER_ADMIN]), fetch)
route.get("/getSchools/:id", authorizeRole([Roles.SUPER_ADMIN]), fetchById)
route.put("/updateSchool/:id", authorizeRole([Roles.SUPER_ADMIN]), update)
route.delete("/deleteSchool/:id", authorizeRole([Roles.SUPER_ADMIN]), deleteSchool)

export default route;