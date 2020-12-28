/* eslint-disable comma-dangle */
// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const path = require('path');
// const _ = require('lodash');
// eslint-disable-next-line import/no-dynamic-require
// const date = require(path.join(__dirname, '/date.js'));
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes')();
const listRouter = require('./routes/listRoutes')();

mongoose.connect('mongodb://localhost:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'public/css/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/auth', authRouter);
app.use('/lists', listRouter);

app.get('/', (req, res) => {
  debug('App has started!');
  res.redirect('/auth');
});

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  debug(`Server started on http://localhost:${port}\nCopy link in browser`);
});
