const express = require('express');

//const apiRouter = require('./routes/api.router');

const app = express();

app.use(express.static('public'));

module.exports = app;
