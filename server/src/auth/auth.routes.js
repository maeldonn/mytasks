const express = require('express');

const middlewares = require('./auth.middlewares');
const controller = require('./auth.controller');

const router = express.Router();

const defaultLoginError = 'Unable to login';

// POST /auth/register
router.post(
  '/register',
  middlewares.speedLimiter(10, 5, 1),
  middlewares.validateUser(),
  middlewares.findUser('Email address is already in use', (user) => !user, 409),
  middlewares.rateLimiter(10, 3),
  controller.register,
);

// POST /auth/login
router.post(
  '/login',
  middlewares.speedLimiter(10, 5, 1),
  middlewares.rateLimiter(10, 30),
  middlewares.validateUser(defaultLoginError),
  middlewares.findUser(defaultLoginError, (user) => (user && user.active)),
  controller.login,
);

module.exports = router;
