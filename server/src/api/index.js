const express = require('express');

const middlewares = require('../middlewares');
const todos = require('./todos/todos.routes');
const users = require('./users/users.routes');

const router = express.Router();

router.use('/todos', todos);
router.use('/users', middlewares.isAdmin, users);

module.exports = router;
