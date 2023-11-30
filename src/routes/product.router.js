const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = productRouter;