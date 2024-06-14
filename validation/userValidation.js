const Joi = require('joi');

const validateRegister = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        role: Joi.string().valid('user', 'admin').required()
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

module.exports = {
    validateRegister,
    validateLogin
};
