const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const userSchema = require('./auth.schema');
const users = require('./auth.model');

const validateUser = (defaultErrorMessage) => (req, res, next) => {
  const value = userSchema.validate(req.body);
  if (!value.error) {
    next();
  } else {
    const error = defaultErrorMessage ? new Error(defaultErrorMessage) : value.error;
    res.status(422);
    next(error);
  }
};

const findUser = (ErrorMessage, isValid, errorCode = 422) => async (req, res, next) => {
  const user = await users.findOne({
    email: req.body.email,
  });
  if (isValid(user)) {
    req.loggingInUser = user;
    next();
  } else {
    res.status(errorCode);
    next(new Error(ErrorMessage));
  }
};

const rateLimiter = (windowMs, max) => rateLimit({
  windowMs: windowMs * 60 * 1000,
  max,
});

const speedLimiter = (windowMs, delayAfter, delayMs) => slowDown({
  windowMs: windowMs * 60 * 1000,
  delayAfter,
  delayMs: delayMs * 1000,
});

module.exports = {
  validateUser,
  findUser,
  rateLimiter,
  speedLimiter,
};
