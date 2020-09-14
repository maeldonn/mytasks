const db = require('../../db/connect');

const users = db.get('users');

module.exports = users;
