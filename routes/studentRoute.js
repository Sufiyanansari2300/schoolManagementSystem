import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import {create, fetchByClassId, fetchById, deleteStudent, update} from "../controller/studentController.js";
import { validateRequest } from "../mws/requestValidator.js"
import { validateParams } from "../mws/paramValidator.js"
import paramSchema from "../mws/paramSchema.js"
import createStudentSchema from "../mws/createStudentSchema.js";


const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateRequest(createStudentSchema), create)
route.get("/fetchByClassId/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), fetchByClassId)
route.get("/fetchById/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), fetchById)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), validateRequest(createStudentSchema), update)
route.delete("/deleteStudent/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), deleteStudent)

export default route;