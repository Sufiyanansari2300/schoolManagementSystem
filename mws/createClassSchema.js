import Joi from 'joi';

const createClassSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": `"name" should be a string`,
            "string.empty": `"name" cannot be empty`,
            "string.min": `"name" should have a minimum length of 2`,
            "string.max": `"name" should have a maximum length of 50`,
            "any.required": `"name" is required`
        }),

    capacity: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .required()
        .messages({
            "number.base": `"capacity" should be a number`,
            "number.integer": `"capacity" should be an integer`,
            "number.min": `"capacity" should be at least 1`,
            "number.max": `"capacity" cannot exceed 100`,
            "any.required": `"capacity" is required`
        }),

    resources: Joi.array()
        .items(Joi.string().min(2).max(50))
        .min(1)
        .required()
        .messages({
            "array.base": `"resources" should be an array`,
            "array.includes": `"resources" can only contain strings`,
            "any.required": `"resources" is required`
        }),

    schoolId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"schoolId" must be a valid 24-character hexadecimal string`,
            "any.required": `"schoolId" is required`
        })
});

export default createClassSchema;
