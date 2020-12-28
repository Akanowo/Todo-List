/* eslint-disable comma-dangle */
// jshint esversion:8
const mongoose = require('mongoose');
const { itemsSchema } = require('./item.model');

const userSchema = {
  name: {
    type: String,
    required: [1, 'Please provide a name']
  },
  email: {
    type: String,
    required: [1, 'Please provide an email']
  },
  password: {
    type: String,
    required: [1, 'Please provide a password']
  },
  todos: {
    type: [String],
    required: [1, 'Please provide a todo']
  }
};

const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User
};
