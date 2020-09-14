const express = require('express');

const controller = require('./users.controller');

const router = express.Router();

// GET /api/v1/users
router.get('/', controller.getUsers);

// PATCH /api/v1/users/:id
router.patch('/:id', controller.changeUser);

module.exports = router;
