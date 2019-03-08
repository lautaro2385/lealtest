'use strict'
const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

/**
 * Esquema de un usuario para registrar
 */
const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required()
})

module.exports = {
  loginSchema
}
