'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const controller = require('../controller/transaction.controller')
const pagination = require('./middleware/pagination.mdw')
const { verifyToken } = require('./middleware/autenticacion.mdw');
const { buildOkResponse, buildCreatedResponse, buildOkPaginationResponse } = require('../util/util-response');

const api = asyncify(express.Router())

api.get('/transaction/point', [verifyToken, pagination], getPoints)
api.get('/transaction/history', [verifyToken, pagination], getHistory)
api.post('/transaction', verifyToken, create)
api.delete('/transaction/:id', verifyToken, inactivate)

async function getPoints(req, res) {
  let data = await controller.getPoints(req.usr.sub)
  data = isNaN(data) ? 0 : data
  buildOkResponse(res, { total: data })
}

async function getHistory(req, res) {
  let data = await controller.getHistory(req.usr.sub, req.limit, req.page)
  buildOkPaginationResponse(res, data)
}

async function inactivate(req, res) {
  let data = await controller.inactivate(req.params.id)
  buildOkResponse(res, data)
}

async function create(req, res) {
  let resp = await controller.create(req.usr.sub, req.body)
  buildCreatedResponse(res, resp)
}

module.exports = api
