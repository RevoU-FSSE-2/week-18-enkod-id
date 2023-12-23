const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false, // Tidak menyertakan _id untuk sub-dokumen
  }
);

const transactionSchema = mongoose.Schema(
  {
    idTransaction: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    idUser: {
      type: String,
      required: true,
      trim: true,
    },
    idStore: {
      type: String,
      required: true,
      trim: true,
    },
    products: [productSchema], // Mengganti idProduct dengan array products
    transactionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Menambahkan plugin yang mengonversi mongoose menjadi JSON
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
