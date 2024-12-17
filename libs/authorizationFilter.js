import ApiResponse from "../response/ApiResponse.js"
export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json(new ApiResponse(403, "Access Denied: You do not have permission to access this resource", null));
      }
      next();
    };
  };