/* eslint-disable comma-dangle */
// jshint esversion:8
const express = require('express');
const { Item } = require('../models/item.model');

const item1 = new Item({
  name: 'Welcome to your todolist!'
});

const item2 = new Item({
  name: 'Hit the + button to add a new item'
});

const item3 = new Item({
  name: '<-- Hit this to delete and item'
});

const items = [item1, item2, item3];

const listController = require('../controllers/listController')(items);

const listRouter = express.Router();

const routes = () => {
  const {
    getIndex,
    postIndex,
    getCustomListName,
    postDelete
  } = listController;

  function middleware(req, res, next) {
    if (req.cookies.user_id) {
      return next();
    }
    return res.redirect('/auth/login');
  }
  listRouter.use(middleware);

  listRouter.route('/')
    .get(getIndex)
    .post(postIndex);

  listRouter.route('/:customListName')
    .get(getCustomListName);

  listRouter.route('/delete')
    .post(postDelete);

  return listRouter;
};

module.exports = routes;
