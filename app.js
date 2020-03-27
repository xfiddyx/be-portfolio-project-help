const express = require('express');
const { indexRouter } = require('./routers/index.router');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'), indexRouter);
//app.use(express.static('public'));

module.exports = app;
