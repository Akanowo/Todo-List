/* eslint-disable comma-dangle */
// jshint esversion:8
const mongoose = require('mongoose');

const itemsSchema = {
  todos: {
    type: String,
    required: [1, 'Please provide a todo!']
  }
};

const Item = mongoose.model('Item', itemsSchema);

module.exports = {
  itemsSchema,
  Item
};
