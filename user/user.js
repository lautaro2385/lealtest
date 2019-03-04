'use strict';
require('./config/config');
const http = require('http');
const compression = require('compression');
const express = require('express');
const asyncify = require('express-asyncify');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('legal:user');
const HttpStatus = require('http-status-codes');
const { buildErrorResponse } = require('./util/util-response');

const app = asyncify(express());
const server = http.createServer(app);

// compress responses
app.use(compression());

// Cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Authentication, Content-Type, X-Requested-With, X-API-KEY, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE, PATCH');
  res.header('Allow', 'GET, PUT, POST, OPTIONS, DELETE, PATCH');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Rutasbase
//app.use(require('./routes/index'));

app.use((err, req, res, next) => {
  debug(`Error: ${err}`);
  // si es error de id en la base de datos
  if (err.message.indexOf('Cast to ObjectId failed for value') !== -1) {
    return buildErrorResponse(res, HttpStatus.BAD_REQUEST, `Objeto con id ${err.stringValue} no está registrado`);
  }

  if (err.isJoi) {
    return buildErrorResponse(res, HttpStatus.BAD_REQUEST, err.details.map(e => e.message).join('; '));
  }

  if (err.name === 'ValidationError') {
    return buildErrorResponse(res, HttpStatus.CONFLICT, err.message);
  }

  if (err.status) {
    return buildErrorResponse(res, err.status, err.message);
  }

  return buildErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, undefined, err.message);
});

function handleFatalError(err) {
  debug(`${chalk.red('Fatal error')} ${err.message}`);
  debug(err.stack);
  process.exit(1);
}

process.on('uncaughtException', handleFatalError);
process.on('uncaughtRejection', handleFatalError);

//connectDB();

server.listen(process.env.PORT, () => {
  debug(`${chalk.green('[legal-user]')} server listening ${process.env.PORT}`);
});
