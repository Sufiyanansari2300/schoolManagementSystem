import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { allocateSchoolAdmin } from "../controller/entityMappingController.js";



const route = express.Router();

route.post ("/schoolAdminWithSchools", authorizeRole([Roles.SUPER_ADMIN]), allocateSchoolAdmin)

export default route;