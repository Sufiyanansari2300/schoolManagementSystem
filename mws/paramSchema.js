import Joi from "joi";

const paramSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required()
        .messages({
            "string.pattern.base": `"id" must be a valid 24-character hexadecimal string`,
            "any.required": `"id" is required`
        }),
});

export default paramSchema;