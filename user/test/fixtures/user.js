'use strict'
const md5 = require('md5')
const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')
const _ = require('underscore')
const { FORMAT_DATE, FORMAT_DATETIME } = require('../../config/constants')

// modelo para guardar en la base de datos
let userDb = {
  name: 'Prueba',
  lastname: 'uno',
  birth_date: new Date(),
  email: 'prueba@uno.com',
  password: '123456',
  user_id: md5('prueba@uno.com')
}

// modelo para enviar al solicitud al servicio rest
let user1 = explote(userDb, { birth_date: '1985-01-23' })
// modelo para enviar al solicitud al servicio rest
let user2 = explote(userDb, { birth_date: '1985-01-23', email: 'prueba@dos.com', user_id: md5('prueba@dos.com') })
// modelo a guardar en la DB
let user2ToDb = explote(user2, { password: bcrypt.hashSync(user2.password), birth_date: new Date(1985, 0, 23) })
let user1ToDb = explote(userDb, { password: bcrypt.hashSync(userDb.password), birth_date: new Date(1985, 0, 23) })
// respuesta de la base de datos, sin psw y con las fechas de modificacion
user2ToDb.toJSON = function () {
  let val = explote(user2ToDb, { birth_date: moment(user2ToDb.birth_date).format(FORMAT_DATE) })
  val = _.extend(val, { created_date: moment(new Date(2018, 1, 1)).format(FORMAT_DATETIME), updated_date: moment(new Date(2018, 1, 1)).format(FORMAT_DATETIME) })
  return _.omit(val, ['password', 'toJSON'])
}

user1ToDb.toJSON = function () {
  let val = explote(user1ToDb, { birth_date: moment(user1ToDb.birth_date).format(FORMAT_DATE) })
  val = _.extend(val, { created_date: moment(new Date(2018, 1, 1)).format(FORMAT_DATETIME), updated_date: moment(new Date(2018, 1, 1)).format(FORMAT_DATETIME) })
  return _.omit(val, ['password', 'toJSON'])
}

function explote (user, params) {
  let u = Object.assign({}, user)
  return Object.assign(u, params)
}

module.exports = {
  single: userDb,
  single1: user1,
  single1ToDb: user1ToDb,
  single2: user2,
  single2ToDb: user2ToDb,
  loginData: { email: userDb.email, password: userDb.password },
  successCreateResponse1: { ok: true, message: 'Created', data: userDb }
}
