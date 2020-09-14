const express = require('express');

const controller = require('./todos.controller');

const router = express.Router();

// GET /api/v1/todos
router.get('/', controller.getList);

// POST /api/v1/users
router.post('/', controller.createTodo);

// DELETE /api/v1/users/:id
router.delete('/:id', controller.deleteTodo);

module.exports = router;
