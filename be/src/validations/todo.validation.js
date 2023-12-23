const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().required(),
    dueDate: Joi.string().required(),
  }),
};

const getTodos = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    todoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      priority: Joi.string(),
      dueDate: Joi.string(),
    })
    .min(1),
};

const deleteTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
