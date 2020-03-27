const indexRouter = require('express').Router();

const { contactRouter } = require('./contact.router');
indexRouter.use('/contact', contactRouter);

module.exports = { indexRouter };
