/* eslint-disable comma-dangle */
// jshint esversion:8
const mongoose = require('mongoose');
const { itemsSchema } = require('./item.model');

const ListSchema = {
  name: {
    type: String,
    required: [1, 'Please insert a name!']
  },
  items: [itemsSchema]
};


const List = mongoose.model('List', ListSchema);

module.exports = {
  ListSchema,
  List
};
