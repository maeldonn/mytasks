const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().trim().min(8),
  role: Joi.array().items(Joi.string().valid('user', 'admin')),
  active: Joi.bool(),
});

module.exports = userSchema;
