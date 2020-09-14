const express = require('express');

const middlewares = require('./auth.middlewares');
const controller = require('./auth.controller');

const router = express.Router();

const defaultLoginError = 'Unable to login';

// POST /auth/register
router.post(
  '/register',
  middlewares.validateUser(),
  middlewares.findUser('Email address is already in use', (user) => !user, 409),
  controller.register,
);

// POST /auth/login
router.post(
  '/login',
  middlewares.validateUser(defaultLoginError),
  middlewares.findUser(defaultLoginError, (user) => (user && user.active)),
  controller.login,
);

module.exports = router;
