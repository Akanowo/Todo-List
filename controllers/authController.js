/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
// jshint esversion:8
const { User } = require('../models/user.model');

function authController() {
  function getIndex(req, res) {
    res.redirect('/auth/signup');
  }

  function getSignUp(req, res) {
    res.render('signup');
  }

  function postSignUp(req, res) {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
      todos: []
    });

    return User.findOne({ email }, (err, doc) => {
      if (err) {
        return res.json({
          status: 'failed',
          message: 'An error occured',
          error: err
        });
      }

      if (doc) {
        return res.json({
          status: 'failed',
          message: 'User exists',
          user: doc
        });
      }

      return user.save((error, newUser) => {
        if (error) {
          return res.json({
            status: 'failed',
            message: 'Could not create user',
            error
          });
        }
        return res.json({
          status: 'success',
          message: 'User created successfully',
          newUser
        });
      });
    });
  }

  function getLogin(req, res) {
    console.log(`Ip Address: ${req.ip}`);
    res.render('login');
  }

  function postLogin(req, res) {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    return User.findOne({ email }, (err, doc) => {
      if (err) {
        return res.json({
          status: 'failed',
          message: 'Invalid username or password',
          error: err
        });
      }
      if (!doc) {
        return res.json({
          status: 'failed',
          message: 'Invalid username or password',
        });
      }
      return doc.password === password && doc.email === email
        ? res.cookie('user_id', doc._id, {
          path: '/lists',
          maxAge: 60000,
        }).redirect('/lists') : res.json({
          status: 'failed',
          message: 'Invalid username or password'
        });
    });
  }

  return {
    getIndex,
    getSignUp,
    postSignUp,
    getLogin,
    postLogin
  };
}

module.exports = authController();
