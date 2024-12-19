import Joi from 'joi';

const createStudentSchema = Joi.object({
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

    age: Joi.number()
        .integer()
        .min(3)
        .max(18)
        .required()
        .messages({
            "number.base": `"age" should be a number`,
            "number.integer": `"age" should be an integer`,
            "number.min": `"age" should be at least 3`,
            "number.max": `"age" cannot exceed 18`,
            "any.required": `"age" is required`
        }),

    gender: Joi.string()
        .valid("Male", "Female")
        .required()
        .messages({
            "string.base": `"gender" should be a string`,
            "any.only": `"gender" must be one of [Male, Female]`,
            "any.required": `"gender" is required`
        }),

    classId: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId validation
        .required()
        .messages({
            "string.pattern.base": `"classId" must be a valid 24-character hexadecimal string`,
            "any.required": `"classId" is required`
        })
});

export default createStudentSchema;
