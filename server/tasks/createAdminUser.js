const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../src/db/connect');

const users = db.get('users');

async function createAdminUser() {
  try {
    const admin = await users.findOne({ role: 'admin' });
    if (!admin) {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, salt);
      await users.insert({
        email: 'admin@admin.fr',
        password: hash,
        role: 'admin',
        active: true,
      });
      console.log('Admin user created. ✅');
    } else {
      console.log('Admin already exists. ❌');
    }
  } finally {
    db.close();
  }
}

createAdminUser();
