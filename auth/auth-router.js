const express = require('express');
const router = express.Router();
const dbUsers = require('../users/users-model');
const bcrypt = require('bcryptjs');

const restricted = require('../middleware/restricted');

router.post('/api/register', async (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ message: 'username required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'password required' });
  }
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await dbUsers.addUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/api/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await dbUsers.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      res.status(200).json({ message: `${username} Logged in` });
    } else {
      res.status(401).json({ message: 'You shall not Pass!' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/api/users', restricted(), async (req, res, next) => {
  try {
    const allUsers = await dbUsers.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
