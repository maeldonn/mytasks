const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
});

module.exports = todoSchema;
