const express = require('express');
const router = express.Router();
const todo = require('../controllers/todo.js');
const catchAsync = require('../utils/catchAsync.js')
const { isLoggedIn } = require('../middleware');

router.route('/').post(isLoggedIn, todo.createToDo);

router.get('/new', isLoggedIn, todo.renderNewTodo);

router.get('/:id/edit', isLoggedIn, todo.editTodo);

router.get('/:id/show', catchAsync(todo.showTodo));

router.patch('/:id/toggle', todo.toggleTodo);

router
  .route('/:id')
  .put(isLoggedIn, todo.updateTodo)
  .delete(isLoggedIn, todo.deleteTodo);

module.exports = router;
