import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { create, fetchBySchoolId, fetchById, update, deleteClass} from "../controller/classController.js";
import { validateRequest } from "../mws/requestValidator.js"
import { validateParams } from "../mws/paramValidator.js"
import paramSchema from "../mws/paramSchema.js"
import createClassSchema from "../mws/createClassSchema.js"


const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateRequest(createClassSchema), create)
route.get("/fetchBySchoolId/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), fetchBySchoolId)
route.get("/fetchById/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), fetchById)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema),  validateRequest(createClassSchema), update)
route.delete("/deleteClass/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateParams(paramSchema), deleteClass)

export default route;