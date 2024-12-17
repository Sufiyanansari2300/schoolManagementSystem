import { verifyToken } from "../libs/authUtils.js";
import ApiResponse from "../response/ApiResponse.js"

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(new ApiResponse(401, "Access Denied: No Token Provided", null));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json(new ApiResponse(403, "Invalid or Expired Token", null));
    }
};
