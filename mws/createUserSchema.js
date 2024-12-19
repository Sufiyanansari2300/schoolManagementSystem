import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
        .messages({
            "string.base": `"name" should be a string`,
            "string.empty": `"name" cannot be empty`,
            "string.min": `"name" should have a minimum length of 3`,
            "string.max": `"name" should have a maximum length of 100`,
            "any.required": `"name" is required`
        }),
    email: Joi.string().email().required()
        .messages({
            "string.email": `"email" must be a valid email`,
            "string.empty": `"email" cannot be empty`,
            "any.required": `"email" is required`
        }),
    role: Joi.number().integer().valid(1, 2, 3).required()
        .messages({
            "number.base": `"role" should be a number`,
            "number.integer": `"role" should be an integer`,
            "any.only": `"role" must be one of [1, 2]`,
            "any.required": `"role" is required`
        }),
    password: Joi.string().min(8).max(50).required()
        .messages({
            "string.base": `"password" should be a string`,
            "string.empty": `"password" cannot be empty`,
            "string.min": `"password" should have a minimum length of 8`,
            "string.max": `"password" should have a maximum length of 50`,
            "any.required": `"password" is required`
        })
});

export default createUserSchema;