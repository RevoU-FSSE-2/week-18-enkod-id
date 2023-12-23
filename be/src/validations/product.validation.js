const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    idStore: Joi.string().required(),
    idUser: Joi.string().required().custom(objectId),
    category: Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    title: Joi.string(),
    price: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      idStore: Joi.string(),
      idUser: Joi.string().custom(objectId),
      category: Joi.string(),
      title: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
      description: Joi.string(),
      image: Joi.string(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
