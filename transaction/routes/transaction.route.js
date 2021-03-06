'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const controller = require('../controller/transaction.controller')
const pagination = require('./middleware/pagination.mdw')
const json2xls = require('json2xls')
const { verifyToken } = require('./middleware/autenticacion.mdw')
const { buildOkResponse, buildCreatedResponse, buildOkPaginationResponse } = require('../util/util-response')

const api = asyncify(express.Router())

api.use(json2xls.middleware)

api.get('/point', [verifyToken, pagination], getPoints)
api.get('/history', [verifyToken, pagination], getHistory)
api.get('/export', [verifyToken], exportFile)
api.post('/', verifyToken, create)
api.delete('/:id', verifyToken, inactivate)

async function getPoints (req, res) {
  let data = await controller.getPoints(req.usr.sub)
  data = isNaN(data) ? 0 : data
  buildOkResponse(res, { total: data })
}

async function getHistory (req, res) {
  let data = await controller.getHistory(req.usr.sub, req.limit, req.page)
  buildOkPaginationResponse(res, data)
}

async function exportFile (req, res) {
  let data = await controller.getAll(req.usr.sub, req.limit, req.page)
  if (data.length === 0) { data = { result: 'no hay transacciones' } }
  res.xls('data.xlsx', data)
}

async function inactivate (req, res) {
  let data = await controller.inactivate(req.params.id)
  buildOkResponse(res, data)
}

async function create (req, res) {
  let resp = await controller.create(req.usr.sub, req.body)
  buildCreatedResponse(res, resp)
}

module.exports = api
