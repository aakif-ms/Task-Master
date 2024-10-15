const todo = require("../models/todo");
const ToDo = require("../models/todo");

module.exports.createToDo = async (req, res) => {
  const todo = new ToDo(req.body.todo);
  todo.author = req.user;
  await todo.save();
  req.flash("success", "Added todo");
  res.redirect("/");
};
module.exports.renderNewTodo = (req, res) => {
  res.render("todo/new");
};

module.exports.showTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await ToDo.findById(id);
  if (!todo) {
    req.flash("error", "Cannot find todo");
    return res.redirect("/");
  }
  const date = todo.getFormattedBirthDate();
  res.render("todo/show", { todo, date });
};

module.exports.editTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await ToDo.findById(id);
  res.render("todo/edit", { todo });
};

module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await ToDo.findByIdAndUpdate(id, {
    ...req.body.todo,
  });
  await todo.save();
  res.redirect("/");
};

module.exports.toggleTodo = async (req, res) => {
  const todo = await ToDo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.send(todo);
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await ToDo.findByIdAndDelete(id);
  res.redirect("/");
};
