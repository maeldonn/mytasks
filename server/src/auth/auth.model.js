const db = require('../db/connect');

const users = db.get('users');
users.createIndex('email', { unique: true });

module.exports = users;
