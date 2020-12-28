/* eslint-disable comma-dangle */
// jshint esversion:8
const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

const router = () => {
  const {
    getIndex,
    getLogin,
    getSignUp,
    postLogin,
    postSignUp
  } = authController;

  authRouter.route('/')
    .get(getIndex);

  authRouter.route('/signup')
    .get(getSignUp)
    .post(postSignUp);

  authRouter.route('/login')
    .get(getLogin)
    .post(postLogin);
  return authRouter;
};

module.exports = router;
