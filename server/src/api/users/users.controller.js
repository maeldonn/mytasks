const brcypt = require('bcryptjs');

const users = require('./users.model');
const userSchema = require('./users.schema');

const getUsers = async (req, res, next) => {
  try {
    // TODO : Remove password in the request
    const userList = await users.find({});
    userList.forEach((user) => {
      delete user.password;
    });
    res.json(userList);
  } catch (error) {
    next(error);
  }
};

const changeUser = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const value = userSchema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(422);
      throw new Error('Body can\'t be empty');
    }
    if (!value.error) {
      const user = await users.findOne({ _id });
      if (user) {
        const updatedUser = req.body;
        if (updatedUser.password) {
          const salt = await brcypt.genSalt(12);
          updatedUser.password = await brcypt.hash(updatedUser.password, salt);
        }
        // TODO: Remove password in the request
        const result = await users.findOneAndUpdate({ _id }, { $set: updatedUser });
        delete result.password;
        res.json(result);
      } else {
        next();
      }
    } else {
      res.status(422);
      throw new Error(value.error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  changeUser,
};
