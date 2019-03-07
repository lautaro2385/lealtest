'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const controller = require('../controller/transaction.controller')
const { buildOkResponse, buildCreatedResponse } = require('../util/util-response');

const api = asyncify(express.Router())

api.get('/transaction', search)
api.get('/transaction/history', getHistory)
api.post('/transaction', create)
api.delete('/transaction/:id', inactivate)

async function search(req, res) {
  let data = await controller.search(req.query)
  buildOkResponse(res, data)
}

async function getHistory(req, res) {
  let data = await controller.getHistory()
  buildOkResponse(res, data)
}

async function inactivate(req, res) {
  let data = await controller.login(req.body)
  buildOkResponse(res, data)
}

async function create(req, res) {
  const createModel = req.body
  let resp = await controller.register(createModel)
  buildCreatedResponse(res, resp)
}

module.exports = api
