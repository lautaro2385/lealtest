'use strict'
const _ = require('underscore')
const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const { userRegisterSchema } = require('./model/user.model')
const { loginSchema } = require('./model/login.model')
const model = require('../db/model')
const md5 = require('md5')
const bcrypt = require('bcrypt-nodejs')
const createError = require('http-errors')
const jwt = require('../config/jwt')

const paramSchema = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
}
/**
 * Registra un usuario en la base de datos,
 * si el usuario ya existe devuelve un error
 * @param {*} createModel
 */
async function register (createModel) {
  // valida la integridad de los datos del usuario
  createModel = await Joi.validate(createModel, userRegisterSchema, paramSchema)
  // el id es el md5 del correo
  createModel.user_id = md5(createModel.email)

  // revisa si el usuario existe
  const usr = await model.user.findByUserId(createModel.user_id)

  if (usr) {
    throw createError.Conflict('El usuario ya existe!')
  }
  // Hash a password
  var hash = bcrypt.hashSync(createModel.password)
  createModel.password = hash
  return model.user.create(createModel)
}

/**
 * Realiza la validación del login del usuario y la generación del token
 * @param {*} modelLogin
 */
async function login (modelLogin) {
  // valida la integridad de los datos del usuario
  modelLogin = await Joi.validate(modelLogin, loginSchema)
  const id = md5(modelLogin.email)
  // revisa si el usuario no existe
  const usr = await model.user.findByUserId(id)
  if (!usr) {
    throw createError.Unauthorized('usuario y/o contraseña inválida')
  }

  const val = bcrypt.compareSync(modelLogin.password, usr.password)
  // si no son iguales las contraseñas
  if (!val) {
    throw createError.Unauthorized('usuario y/o contraseña inválida')
  }
  // genera token
  let token = jwt.createToken(usr)
  let resp = { user: usr }
  if (usr.toJSON) { resp.user = Object.assign({}, usr.toJSON()) }
  resp.user = _.omit(resp.user, ['password'])
  resp.token = token
  return resp
}

module.exports = {
  register,
  login
}
