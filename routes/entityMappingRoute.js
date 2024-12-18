import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { allocateSchoolAdmin, transferWithinSchool, transferBetweenSchool } from "../controller/entityMappingController.js";



const route = express.Router();

route.post ("/schoolAdminWithSchools", authorizeRole([Roles.SUPER_ADMIN]), allocateSchoolAdmin)
route.post ("/transferWithinSchool", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), transferWithinSchool)
route.post ("/transferBetweenSchool", authorizeRole([Roles.SUPER_ADMIN]), transferBetweenSchool)

export default route;