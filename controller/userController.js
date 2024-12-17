import User from "../model/userModel.js"
import ApiResponse from "../response/ApiResponse.js"
// For posting data into database 
export const create = async(req, res)=>{
    try {
        const userData = new User( req.body);
        const {email} = userData;
        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(400).json(new ApiResponse(400, "User already exist.", null));
        }
        const savedUser = await userData.save();
        res.status(200).json(new ApiResponse(200, "User created successfully.", savedUser));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}

// For getting all users from database 
export const fetch = async (req, res)=>{
    try {
        const users = await User.find();
        if(users.length === 0 ){
            return res.status(404).json(new ApiResponse(404, "No users found.", null))
        }
        res.status(200).json(new ApiResponse(200, "Users fetched successfully.", users));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}
// For updating data 
export const update = async (req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.status(404).json(new ApiResponse(404, "User not found.", null))
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json(new ApiResponse(200, "User updated successfully.", updateUser));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}
// For deleting data from database 
export const deleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json(new ApiResponse(404, "User not found.", null))
        }
        await User.findByIdAndDelete(id);
        res.status(201).json(new ApiResponse(200, "User deleted successfully.", null));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}