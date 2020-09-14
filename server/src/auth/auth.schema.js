const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(8).required(),
});

module.exports = userSchema;
