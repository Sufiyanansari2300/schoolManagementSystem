import ApiResponse from "../response/ApiResponse.js"
import Class from "../model/classModel.js"
import Student from "../model/studentModel.js"

export const create = async(req, res)=>{
    try {
        const studentData = new Student(req.body);
        const classExist = await Class.findById(studentData.classId);
        if (!classExist){
            return res.status(404).json(new ApiResponse(404, "Class not found.", null));
        }
        const savedStudent = await studentData.save();
        classExist.studentIds.push(savedStudent._id);
        await classExist.save();
        res.status(200).json(new ApiResponse(200, "Student created successfully.", savedStudent));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetchByClassId = async (req, res)=>{
    try {
        const students = await Student.find({classId:req.params.id});
        if(students.length === 0 ){
            return res.status(404).json(new ApiResponse(404, "No students found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Students fetched successfully.", students));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetchById = async (req, res)=>{
    try {
        const id = req.params.id;
        const studentData = await Student.findOne({_id:id})
        if(!studentData){
            return res.status(404).json(new ApiResponse(404, "No student found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Student fetched successfully.", studentData));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const deleteStudent = async (req, res)=>{
    try {
        const id = req.params.id;
        const studentData = await Student.findOne({_id:id})
        if(!studentData){
            return res.status(404).json(new ApiResponse(404, "No Student found.", null))
        }
        const classData = await Class.findOne({_id:studentData.classId})
        classData.studentIds.pull(id);
        await classData.save();
        await Student.findByIdAndDelete(id);
        res.status(201).json(new ApiResponse(200, "Student deleted successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const update = async (req, res)=>{
    try {
        const studentData = new Student(req.body);
        const {classId} = studentData;
        const classExist = await Class.findById({classId});
        if (!classExist) {
            return res.status(404).json(new ApiResponse(404, "Class not found.", null));
        }
        const existingStudent = await Student.findOne({_id:req.params.id})
        existingStudent.name = studentData.name || existingStudent.name;
        existingStudent.age = studentData.age || existingStudent.age;
        existingStudent.gender = studentData.gender || existingStudent.gender;
        existingStudent.classId = studentData.classId || existingStudent.classId;
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, existingStudent, {new : true});
        res.status(200).json(new ApiResponse(200, "Student updatd successfully.", updatedStudent));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}
