const Joi = require('joi');

const db = require('../../db/connect');

const todos = db.get('todos');

const todoSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
});

const getList = (req, res) => {
  todos.find({ user_id: req.user._id }).then((todoList) => {
    res.json(todoList);
  });
};

const createTodo = (req, res, next) => {
  const value = todoSchema.validate(req.body);
  if (!value.error) {
    // Schema is correct
    const todo = {
      ...req.body,
      user_id: req.user._id,
    };
    todos.insert(todo).then((insertedTodo) => {
      res.json(insertedTodo);
    });
  } else {
    // Schema isn't correct
    const error = new Error(value.error);
    res.status(422);
    next(error);
  }
};

const deleteTodo = (req, res) => {
  todos.findOneAndDelete({ _id: req.params.id }).then((result) => {
    getList(req, res);
  });
};

module.exports = {
  getList,
  createTodo,
  deleteTodo,
};
