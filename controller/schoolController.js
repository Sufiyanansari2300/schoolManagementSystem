import ApiResponse from "../response/ApiResponse.js"
import School from "../model/schoolModel.js"

export const create = async(req, res)=>{
    try {
        const school = new School(req.body);
        const {name} = school;
        const schoolExist = await School.findOne({name})
        if (schoolExist){
            return res.status(400).json(new ApiResponse(400, "School already exist.", null));
        }
        school.createdBy = req.user.id;
        const savedSchool = await school.save();
        res.status(200).json(new ApiResponse(200, "School created successfully.", savedSchool));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetch = async (req, res)=>{
    try {
        const schools = await School.find();
        if(schools.length === 0 ){
            return res.status(404).json(new ApiResponse(404, "No schools found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Schools fetched successfully.", schools));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const fetchById = async (req, res)=>{
    try {
        const id = req.params.id;
        const school = await School.findOne({_id:id})
        if(!school){
            return res.status(404).json(new ApiResponse(404, "No school found.", null))
        }
        res.status(200).json(new ApiResponse(200, "School fetched successfully.", school));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const update = async (req, res)=>{
    try {
        const { name, address } = req.body;
        const school = await School.findOne({_id:req.params.id})
        if(!school){
            return res.status(404).json(new ApiResponse(404, "No school found.", null))
        }
        school.name = name || school.name;
        school.address = address || school.address;
        const updateSchool = await School.findByIdAndUpdate(req.params.id, school, {new : true});
        res.status(200).json(new ApiResponse(200, "School updatd successfully.", updateSchool));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

export const deleteSchool = async (req, res)=>{
    try {
        const id = req.params.id;
        const school = await School.findOne({_id:id})
        if(!school){
            return res.status(404).json(new ApiResponse(404, "No school found.", null))
        }
        await School.findByIdAndDelete(id);
        res.status(201).json(new ApiResponse(200, "School deleted successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}