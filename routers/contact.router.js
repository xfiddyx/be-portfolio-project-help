const contactRouter = require('express').Router();

const { contactForm } = require('../controllers/contact.controller');

contactRouter.route('/').post(contactForm);

module.exports = { contactRouter };
