const express = require('express');
const { indexRouter } = require('./routers/index.router');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'), indexRouter);

module.exports = app;
