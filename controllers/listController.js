/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
// jshint esversion:8
const _ = require('lodash');
const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const { List } = require('../models/list.model');

mongoose.connect('mongodb://localhost:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true });

function listController(items) {
  function getIndex(req, res) {
    if (req.cookies.user_id) {
      const user_id = decodeURIComponent(req.cookies.user_id);
      User.findOne({ _id: user_id }, (err, doc) => {
        if (err) throw err;
        else if (doc) {
          console.log(doc);
          res.render('list', { listTitle: new Date().toDateString(), todos: doc.todos, user_id: doc._id });
        }
      });
    } else {
      res.status(401).json({
        message: 'Unauthorized, please login first',
        links: {
          Login: 'http://localhost:3000/auth/login',
          SignUp: 'http://localhost:3000/auth/signup'
        }
      });
    }
  }

  function postIndex(req, res) {
    console.log(req.body.newListItem);
    if (req.body.newListItem === null || req.body.newListItem === '') {
      return res.json({
        status: 'failed',
        message: 'A todo item is required'
      });
    }
    let id;
    if (req.cookies.user_id) {
      id = req.cookies.user_id;
      return User.findOne({ _id: id }, (err, user) => {
        if (err) {
          return res.json({
            status: 'failed',
            message: 'User does not exist',
            error: err
          });
        }
        console.log(user);
        return User.findOneAndUpdate({ _id: id }, {
          name: user.name,
          email: user.email,
          password: user.password,
          $push: {
            todos: req.body.newListItem.trim()
          }
        }, (error, doc) => {
          if (error) {
            return res.json({
              status: 'failed',
              message: 'Could not create todo',
              error
            });
          }
          return res.redirect('/lists');
        });
      });
    }
    return res.redirect('/auth/login');
  }

  function getCustomListName(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, (err, doc) => {
      if (!err) {
        if (!doc) {
          const newList = new List({
            name: customListName,
            items
          });
          newList.save().then((result) => {
            console.log('Successfully created new document!');
            console.log(result);
          }).catch((error) => {
            throw error;
          });
          res.redirect(`/lists/${customListName}`);
        } else {
          res.render('list', { listTitle: doc.name, newListItems: doc.items });
        }
      }
    });
  }

  function postDelete(req, res) {
    const id = req.body.checkbox;
    const { todo } = req.body;
    console.log(id);
    return User.findOne({ _id: id }, (err, user) => {
      if (err) {
        return res.json({
          status: 'failed',
          message: 'User does not exist',
          error: err
        });
      }
      return User.findByIdAndUpdate(id, {
        name: user.name,
        email: user.email,
        password: user.password,
        $pull: { todos: user.todos.find((x) => x === todo.trim()) }
      }, (error) => {
        if (error) {
          return res.json({
            status: 'failed',
            message: 'Could not delete todo',
            error
          });
        }
        return res.redirect('/lists');
      });
    });
  }
  return {
    getIndex,
    postIndex,
    getCustomListName,
    postDelete
  };
}

module.exports = listController;
