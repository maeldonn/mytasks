const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');

const createTokenSendResponse = (user, res, next) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    active: user.active,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      if (err) {
        res.status(422);
        const error = new Error('Unable to login');
        next(error);
      } else {
        res.json({ token });
      }
    },
  );
};

const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password.trim(), salt);
    const newUser = {
      email: req.body.email,
      password: hash,
      role: 'user',
      active: true,
    };
    const insertedUser = await users.insert(newUser);
    res.status(201);
    createTokenSendResponse(insertedUser, res, next);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(req.body.password, req.loggingInUser.password);
    if (result) {
      createTokenSendResponse(req.loggingInUser, res, next);
    } else {
      res.status(422);
      throw new Error('Unable to login');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
};

module.exports = {
  register,
  login,
};
