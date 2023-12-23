const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');

const generateTransactionId = () => {
  const timestamp = Date.now().toString(16); // Convert to hexadecimal
  const randomValue = Math.floor(Math.random() * 16).toString(16); // Random value from 0 to 15 in hexadecimal
  return `${timestamp}${randomValue}`.toUpperCase();
};

const createTransaction = catchAsync(async (req, res) => {
  try {
    const { idUser, idStore, products, transactionDate } = req.body;

    if (!idUser || !idStore || !products || !transactionDate) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: 'Semua field harus diisi.' });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: 'Produk tidak valid.' });
    }

    const transaction = {
      idTransaction: generateTransactionId(),
      idUser,
      idStore,
      products,
      transactionDate,
    };

    const createdTransaction = await transactionService.createTransaction(transaction);

    res.status(httpStatus.CREATED).send(createdTransaction);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Terjadi kesalahan server.' });
  }
});

const getTransactions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idUser', 'idStore', 'category', 'transactionDate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await transactionService.queryTransactions(filter, options);
  res.send(result);
});

const getTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  res.send(transaction);
});

const updateTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.updateTransactionById(req.params.transactionId, req.body);
  res.send(transaction);
});

const deleteTransaction = catchAsync(async (req, res) => {
  await transactionService.deleteTransactionById(req.params.transactionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
