const { getAll, create, remove } = require('../controllers/image.controllers');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');
const express = require('express');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

imageRouter.route('/:id')
    .delete(verifyJWT, remove);

module.exports = imageRouter;