import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import {create, fetchByClassId, fetchById, deleteStudent, update} from "../controller/studentController.js";


const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), create)
route.get("/fetchByClassId/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), fetchByClassId)
route.get("/fetchById/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), fetchById)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), update)
route.delete("/deleteStudent/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), deleteStudent)

export default route;