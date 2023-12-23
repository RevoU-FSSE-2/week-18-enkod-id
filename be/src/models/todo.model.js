const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

/**
 * @typedef Todo
 */
todoSchema.statics.isTitleTaken = async function (title, excludeTodoId) {
  const todo = await this.findOne({ title, _id: { $ne: excludeTodoId } });
  return !!todo;
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
