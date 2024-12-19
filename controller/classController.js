import ApiResponse from "../response/ApiResponse.js"
import Class from "../model/classModel.js"
import School from "../model/schoolModel.js"
import Student from "../model/studentModel.js"

export const create = async(req, res)=>{
    try {
        const classData = new Class(req.body);
        console.log("Class");
        console.log(classData);
        const {name} = classData;
        const {schoolId} = classData;
        const schoolExists = await School.findById(schoolId);
        console.log(schoolExists);
        if (!schoolExists) {
            return res.status(404).json(new ApiResponse(404, "School not found.", null));
        }
        const classExist = await Class.findOne({name, schoolId});
        if (classExist){
            return res.status(400).json(new ApiResponse(400, "Class already exist.", null));
        }
        const savedClass = await classData.save();
        schoolExists.classIds.push(savedClass._id);
        await schoolExists.save();
        res.status(200).json(new ApiResponse(200, "Class created successfully.", savedClass));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetchBySchoolId = async (req, res)=>{
    try {
        const classes = await Class.find({schoolId:req.params.id});
        if(classes.length === 0 ){
            return res.status(404).json(new ApiResponse(404, "No classes found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Classes fetched successfully.", classes));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetchById = async (req, res)=>{
    try {
        const id = req.params.id;
        const classData = await Class.findOne({_id:id})
        if(!classData){
            return res.status(404).json(new ApiResponse(404, "No class found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Class fetched successfully.", classData));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const update = async (req, res)=>{
    try {
        const classData = new Class(req.body);
        const existingClass = await Class.findById(req.params.id);
        if (!existingClass){
            return res.status(400).json(new ApiResponse(400, "Class not found.", null));
        }
        const schoolExists = await School.findById(existingClass.schoolId);
        if (!schoolExists) {
            return res.status(404).json(new ApiResponse(404, "School not found.", null));
        }
        existingClass.name = classData.name || existingClass.name;
        existingClass.schoolId = classData.schoolId || existingClass.schoolId;
        existingClass.capacity = classData.capacity || existingClass.capacity;
        existingClass.resources = classData.resources || existingClass.resources;
        existingClass.schoolId = classData.schoolId || existingClass.schoolId;
        const updateClass = await Class.findByIdAndUpdate(req.params.id, existingClass, {new : true});
        res.status(200).json(new ApiResponse(200, "Class updatd successfully.", updateClass));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const deleteClass = async (req, res)=>{
    try {
        const id = req.params.id;
        const classData = await Class.findOne({_id:id})
        console.log(classData);
        if(!classData){
            return res.status(404).json(new ApiResponse(404, "No class found.", null))
        }
        console.log("Fetcing school data");
        const schoolData = await School.findOne({classIds:classData._id});
        console.log(schoolData);
        schoolData.classIds.pull(id);
        console.log(schoolData);
        await schoolData.save();
        const students = await Student.find({classId:id});
        console.log(students);
        for (const student of students) {
            await Student.findByIdAndDelete(student._id);
        }
        await Class.findByIdAndDelete(id);
        res.status(201).json(new ApiResponse(200, "Class deleted successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}