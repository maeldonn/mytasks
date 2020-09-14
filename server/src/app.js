const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const auth = require('./auth/auth.routes');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8080',
}));
app.use(helmet());
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

// GET /
app.get('/', (req, res) => {
  res.json({
    user: req.user,
  });
});

app.use('/auth', auth);
app.use('/api/v1', middlewares.isLoggedIn, api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
