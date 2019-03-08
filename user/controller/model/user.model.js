'use strict'
const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const { FORMAT_DATE } = require('../../config/constants')

/**
 * Esquema de un usuario para registrar
 */
const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  birth_date: Joi.date().format(FORMAT_DATE).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required()
})

module.exports = {
  userRegisterSchema
}
