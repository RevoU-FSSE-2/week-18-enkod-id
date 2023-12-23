const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTransaction = {
  body: Joi.object().keys({
    idTransaction: Joi.string().required(),
    idUser: Joi.string().required(),
    idStore: Joi.string().required(),
    products: Joi.array()
      .items(
        Joi.object({
          idProduct: Joi.string().required(),
          category: Joi.string().required(),
          title: Joi.string().required(),
          price: Joi.string().required(),
          qty: Joi.number().required(),
          subtotal: Joi.number().required(),
        })
      )
      .required(),
    transactionDate: Joi.date().required(),
  }),
};

const getTransactions = {
  query: Joi.object().keys({
    idUser: Joi.string(),
    idStore: Joi.string(),
    idProduct: Joi.string(),
    category: Joi.string(),
    title: Joi.string(),
    price: Joi.string(),
    qty: Joi.number().integer(),
    subtotal: Joi.number().integer(),
    transactionDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

const updateTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      idUser: Joi.string(),
      idStore: Joi.string(),
      idProduct: Joi.string(),
      category: Joi.string(),
      title: Joi.string(),
      price: Joi.string(),
      qty: Joi.number().integer(),
      subtotal: Joi.number().integer(),
      transactionDate: Joi.date(),
    })
    .min(1),
};

const deleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
