import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { allocateSchoolAdmin, transferWithinSchool, transferBetweenSchool } from "../controller/entityMappingController.js";
import { validateRequest } from "../mws/requestValidator.js"
import schoolAdminMappingSchema from "../mws/schoolAdminMappingSchema.js"
import transferRequestSchema from "../mws/transferRequestSchema.js"

const route = express.Router();

route.post ("/schoolAdminWithSchools", authorizeRole([Roles.SUPER_ADMIN]), validateRequest(schoolAdminMappingSchema), allocateSchoolAdmin)
route.post ("/transferWithinSchool", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), validateRequest(transferRequestSchema), transferWithinSchool)
route.post ("/transferBetweenSchool", authorizeRole([Roles.SUPER_ADMIN]), validateRequest(transferRequestSchema), transferBetweenSchool)

export default route;