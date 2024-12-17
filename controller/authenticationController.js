import User from "../model/userModel.js"
import ApiResponse from "../response/ApiResponse.js"
import { generateToken } from "../libs/authUtils.js";
import bcrypt from "bcryptjs";

export const login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({email});
        if (!userExist){
            return res.status(400).json(new ApiResponse(400, "Invalid email or password.", null));
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch){
            return res.status(400).json(new ApiResponse(400, "Invalid email or password.", null));
        }
        const token = generateToken(userExist);
        res.status(200).json(new ApiResponse(200, "User logged in successfully.", token));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "Internal Server Error.", null));
    }
}