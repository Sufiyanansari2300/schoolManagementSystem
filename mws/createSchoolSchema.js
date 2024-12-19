import Joi from "joi";

const createSchoolSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": `"name" should be a string`,
            "string.empty": `"name" cannot be empty`,
            "string.min": `"name" should have a minimum length of 3`,
            "string.max": `"name" should have a maximum length of 100`,
            "any.required": `"name" is required`
        }),
    address: Joi.string()
        .min(3)
        .max(200)
        .required()
        .messages({
            "string.base": `"address" should be a string`,
            "string.empty": `"address" cannot be empty`,
            "string.min": `"address" should have a minimum length of 3`,
            "string.max": `"address" should have a maximum length of 200`,
            "any.required": `"address" is required`
        })
});

export default createSchoolSchema;