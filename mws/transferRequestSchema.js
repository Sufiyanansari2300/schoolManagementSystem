import Joi from 'joi';

const transferRequestSchema = Joi.object({
    currentClassId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"currentClassId" must be a valid 24-character hexadecimal string`,
            "any.required": `"currentClassId" is required`
        }),

    destinationClassId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"destinationClassId" must be a valid 24-character hexadecimal string`,
            "any.required": `"destinationClassId" is required`
        }),

    studentId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"studentId" must be a valid 24-character hexadecimal string`,
            "any.required": `"studentId" is required`
        })
});

export default transferRequestSchema;
