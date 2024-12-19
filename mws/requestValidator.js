import ApiResponse from "../response/ApiResponse.js"


export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json(new ApiResponse(400, "Validation failed.", error.details.map((detail) => detail.message)));
        }
        next();
    };
};
