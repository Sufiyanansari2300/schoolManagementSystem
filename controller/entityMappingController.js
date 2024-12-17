import ApiResponse from "../response/ApiResponse.js"
import User from "../model/userModel.js"
import Roles from "../enums/roles.js";
import School from "../model/schoolModel.js"

export const allocateSchoolAdmin = async (req, res)=>{
    try {
        const { schoolAdminId, schoolIds } = req.body;
        const userExist = await User.findById(schoolAdminId);
        if (!userExist || userExist.role !== Roles.SCHOOL_ADMIN){
            return res.status(404).json(new ApiResponse(404, "Invalid school admin ID.", null));  
        } 
        if (userExist.role === Roles.SUPER_ADMIN){
            return res.status(200).json(new ApiResponse(404 , "Super admin is already having accessq to all schools.", null));
        }
        console.log(schoolIds)
        const validSchools = await School.find({ _id: { $in: schoolIds } });
        if (validSchools.length !== schoolIds.length) {
            return res.status(400).json(new ApiResponse(400, "One or more school IDs are invalid.", null));
        }
        console.log(validSchools.length, schoolIds.length)
        if (!userExist.schoolIds) {
            console.log("HELLO")
            userExist.schoolIds = [];
        }
        console.log(userExist)
        const uniqueSchoolIds = [...new Set([...userExist.schoolIds, ...schoolIds])];
        userExist.schoolIds = uniqueSchoolIds;
        await userExist.save();
        res.status(200).json(new ApiResponse(200, "School admin updatd successfully with school ids.", userExist));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}