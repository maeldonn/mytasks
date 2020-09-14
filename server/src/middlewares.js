const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(401);
          next(err);
        }
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
}

function unauthorized(res, next) {
  const error = new Error('Unauthorized');
  res.status(401);
  next(error);
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    unauthorized(res, next);
  }
}

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    unauthorized(res, next);
  }
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

module.exports = {
  checkTokenSetUser,
  isLoggedIn,
  isAdmin,
  notFound,
  errorHandler,
};
