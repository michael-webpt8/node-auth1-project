const db = require('../data/db-config');
const bcrypt = require('bcryptjs');

module.exports = {
  findAll,
  findBy,
  findById,
  addUser,
};

function findAll() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password');
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'username')
    .first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}
