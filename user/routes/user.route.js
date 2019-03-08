'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const controller = require('../controller/user.controller')
const { buildOkResponse, buildCreatedResponse } = require('../util/util-response')

const api = asyncify(express.Router())

api.post('/login', login)
api.post('/user', register)

async function login (req, res) {
  let data = await controller.login(req.body)
  buildOkResponse(res, data)
}

async function register (req, res) {
  const createModel = req.body
  let resp = await controller.register(createModel)
  buildCreatedResponse(res, resp)
}

module.exports = api
