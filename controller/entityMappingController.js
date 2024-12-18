import ApiResponse from "../response/ApiResponse.js"
import User from "../model/userModel.js"
import Roles from "../enums/roles.js";
import School from "../model/schoolModel.js"
import Class from "../model/classModel.js"
import Student from "../model/studentModel.js"

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
        const validSchools = await School.find({ _id: { $in: schoolIds } });
        if (validSchools.length !== schoolIds.length) {
            return res.status(400).json(new ApiResponse(400, "One or more school IDs are invalid.", null));
        }
        if (!userExist.schoolIds) {
            userExist.schoolIds = [];
        }
        const uniqueSchoolIds = [...new Set([...userExist.schoolIds, ...schoolIds])];
        userExist.schoolIds = uniqueSchoolIds;
        await userExist.save();
        res.status(200).json(new ApiResponse(200, "School admin updatd successfully with school ids.", userExist));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const transferWithinSchool = async (req, res)=>{
    try {
        const { currentClassId, destinationClassId, studentId } = req.body;
        if (currentClassId === destinationClassId) {
            return res.status(400).json(new ApiResponse(400, "Classes cannot be same.", null));
        }
        const currentClass = await Class.findById(currentClassId);
        const destinationClass = await Class.findById(destinationClassId);

        if(!currentClass){
            return res.status(404).json(new ApiResponse(404, "Current class not found.", null));
        }
        if(!destinationClass){
            return res.status(404).json(new ApiResponse(404, "Destination class not found.", null));
        }
        if(currentClass.schoolId !== destinationClass.schoolId){
            return res.status(400).json(new ApiResponse(400, "Classes must be in same school.", null));
        }

        const student = await Student.findById(studentId);
        if(!student){
            return res.status(404).json(new ApiResponse(404, "No students found.", null));
        }
        if(destinationClass.studentIds.length >= destinationClass.capacity){
            return res.status(400).json(new ApiResponse(404, "Destination class is full.", null));
        }
        destinationClass.studentIds.push(studentId);
        currentClass.studentIds.pull(studentId);
        student.classId = destinationClassId;
        await student.save();
        await destinationClass.save();
        await currentClass.save();
        res.status(200).json(new ApiResponse(200, "Student transfered successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const transferBetweenSchool = async (req, res)=>{
    try {
        const { currentClassId, destinationClassId, studentId } = req.body;
        if (currentClassId === destinationClassId) {
            return res.status(400).json(new ApiResponse(400, "Classes cannot be same.", null));
        }
        const currentClass = await Class.findById(currentClassId);
        const destinationClass = await Class.findById(destinationClassId);

        if(!currentClass){
            return res.status(404).json(new ApiResponse(404, "Current class not found.", null));
        }
        if(!destinationClass){
            return res.status(404).json(new ApiResponse(404, "Destination class not found.", null));
        }
        if(currentClass.schoolId === destinationClass.schoolId){
            return res.status(400).json(new ApiResponse(400, "Classes must not be in same school.", null));
        }
        const currentSchool = await School.findById(currentClass.schoolId);
        if (!currentSchool){
            return res.status(404).json(new ApiResponse(404, "School not found.", null));
        }
        const destinationSchool = await School.findById(destinationClass.schoolId);
        if (!destinationSchool){
            return res.status(404).json(new ApiResponse(404, "School not found.", null));
        }
        const student = await Student.findById(studentId);
        if(!student){
            return res.status(404).json(new ApiResponse(404, "No students found.", null));
        }
        if(destinationClass.studentIds.length >= destinationClass.capacity){
            return res.status(400).json(new ApiResponse(404, "Destination class is full.", null));
        }
        destinationClass.studentIds.push(studentId);
        currentClass.studentIds.pull(studentId);
        student.classId = destinationClassId;
        await student.save();
        await destinationClass.save();
        await currentClass.save();
        res.status(200).json(new ApiResponse(200, "Student transfered successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

