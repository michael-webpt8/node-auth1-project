const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('./data/db-config');


const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'some who wander are not lost.',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days session
    secure: false,
  },
  store: new KnexSessionStore({
    knex: dbConfig,
    createtable: true,
  }),
}))

server.use('/', authRouter);

server.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to our API',
  });
});

server.use((err, req, res, next) => {
  console.log('Error:', err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`);
});
