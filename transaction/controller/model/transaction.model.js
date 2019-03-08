'use strict'
const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

/**
 * Esquema de un usuario para registrar
 */
const transactionCreateSchema = Joi.object({
  value: Joi.number().required(),
  points: Joi.number().integer().required(),
})

module.exports = {
  transactionCreateSchema
}