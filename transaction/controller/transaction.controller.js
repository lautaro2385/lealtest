'use strict'
const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const { transactionCreateSchema } = require('./model/transaction.model');
const model = require('../db/model');
const createError = require('http-errors')

const paramSchema = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
};

/**
 * REgistra una trasnsacción
 * @param {*} createModel 
 */
async function create(id, createModel) {
  // valida la integridad de los datos de la transacció
  createModel = await Joi.validate(createModel, transactionCreateSchema, paramSchema);
  // por difault el estado es 1
  createModel.status = 1
  // se asocia al suaurio de la solicitus
  createModel.user_id = id
  return model.transaction.create(createModel)
}

/**
 * Cambia el estado de una trasnsacción a 0
 * @param {*} id 
 */
async function inactivate(id) {
  const tr = await model.transaction.findById(id)
  if (!tr)
    throw createError.BadRequest(`Transacción con id ${id} no encontrada`)
  return model.transaction.update(id, { status: 0 })
}

function getHistory(idUser, limit, page) {
  return model.transaction.findPaginationByUserId(idUser, limit, page)
}

function getAll(idUser) {
  return model.transaction.findByUserId(idUser)
}

function getPoints(idUser) {
  return model.transaction.sumPoints({ user_id: idUser, status: 1 })
}

module.exports = {
  create,
  inactivate,
  getHistory,
  getPoints,
  getAll
}
