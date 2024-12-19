import ApiResponse from "../response/ApiResponse.js"

export const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            return res.status(400).json(new ApiResponse(400, "Invalid parameters.", error.details.map((detail) => detail.message)));
        }
        next();
    };
};