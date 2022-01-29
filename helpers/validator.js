const Joi = require("joi")

const validatedCategory = Joi.object(
    {
        name: Joi.string().required().lowercase().min(2),
        description: Joi.string().required()
    }
)

module.exports = {validatedCategory}