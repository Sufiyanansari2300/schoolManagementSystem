import express from "express"
import Roles from "../enums/roles.js";
import { authorizeRole } from "../libs/authorizationFilter.js";
import { create, fetchBySchoolId, fetchById, update, deleteClass} from "../controller/classController.js";


const route = express.Router();

route.post ("/create", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), create)
route.get("/fetchBySchoolId/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), fetchBySchoolId)
route.get("/fetchById/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), fetchById)
route.put("/update/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), update)
route.delete("/deleteClass/:id", authorizeRole([Roles.SUPER_ADMIN, Roles.SCHOOL_ADMIN]), deleteClass)

export default route;