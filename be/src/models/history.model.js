const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const historySchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    orderdate: {
      type: String,
      required: true,
    },
    // Add other fields as needed
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
historySchema.plugin(toJSON);
historySchema.plugin(paginate);

/**
 * @typedef History
 */
const History = mongoose.model('History', historySchema);

module.exports = History;
