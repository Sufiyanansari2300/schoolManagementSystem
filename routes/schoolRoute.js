import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { create, fetch, fetchById, update, deleteSchool } from "../controller/schoolController.js";
import { validateRequest } from "../mws/requestValidator.js"
import { validateParams } from "../mws/paramValidator.js"
import paramSchema from "../mws/paramSchema.js"
import createSchoolSchema from "../mws/createSchoolSchema.js"

const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN]), validateRequest(createSchoolSchema), create)
route.get("/getSchools", authorizeRole([Roles.SUPER_ADMIN]), fetch)
route.get("/getSchools/:id", authorizeRole([Roles.SUPER_ADMIN]), validateParams(paramSchema), fetchById)
route.put("/updateSchool/:id", authorizeRole([Roles.SUPER_ADMIN]), validateParams(paramSchema), validateRequest(createSchoolSchema), update)
route.delete("/deleteSchool/:id", authorizeRole([Roles.SUPER_ADMIN]), validateParams(paramSchema), deleteSchool)

export default route;