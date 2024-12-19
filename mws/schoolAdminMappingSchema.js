import Joi from 'joi';

const schoolAdminMappingSchema = Joi.object({
    schoolAdminId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"schoolAdminId" must be a valid 24-character hexadecimal string`,
            "any.required": `"schoolAdminId" is required`
        }),

    schoolIds: Joi.array()
        .items(
            Joi.string()
                .pattern(/^[a-fA-F0-9]{24}$/) // Each ID must be a valid MongoDB ObjectId
                .required()
                .messages({
                    "string.pattern.base": `"schoolIds" must contain valid 24-character hexadecimal strings`
                })
        )
        .min(1) // Ensures at least one schoolId is provided
        .required()
        .messages({
            "array.base": `"schoolIds" should be an array`,
            "array.min": `"schoolIds" must contain at least one item`,
            "any.required": `"schoolIds" is required`
        })
});

export default schoolAdminMappingSchema;
