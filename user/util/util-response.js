const HttpStatus = require('http-status-codes')

/**
 * construye la estructura de la respuesta de una solicitud exitosa
 * @param {*} res objeto res de http de respuesta
 * @param {Object} data información a devolver
 * @param {String} msg mensaje personalizado de la respuesta
 */
function buildOkResponse (res, data, msg) {
  return buildResponse(res, HttpStatus.OK, msg, data)
}

/**
 * Contruye la respuesta de paginación
 * @param {*} res objeto res de http de respuesta
 * @param {Object} data información a devolver, en el formato de paginación
 * @param {*} msg mensaje de respuesta
 */
function buildOkPaginationResponse (res, data, msg) {
  data.ok = true
  data.message = msg || 'ok'
  return res.status(HttpStatus.OK).send(data)
}

/**
 * Contruye la respuesta de paginación, NO la envia
 * @param {*} res objeto res de http de respuesta
 * @param {Object} data información a devolver
 * @param {*} limit limite de información a enviar
 * @param {*} page numero de pagina a mostrar
 * @param {*} totalCount cantidad total de registros
 * @param {*} count candidad de registros enviados
 * @param {*} msg mensaje de respuesta
 */
function buildPaginationResponse (data, limit, page, totalCount, count) {
  return {
    limit,
    page,
    totalCount,
    count,
    data
  }
}

/**
 * construye la estructura de la respuesta de una solicitud exitosa
 * @param {*} res objeto res de http de respuesta
 * @param {Object} data información a devolver
 * @param {String} msg mensaje personalizado de la respuesta
 */
function buildAcceptedResponse (res, data, msg) {
  return buildResponse(res, HttpStatus.ACCEPTED, msg, data)
}

/**
 * construye la estructura de la respuesta de una creacion de registro exitosa
 * @param {*} res objeto res de http de respuesta
 * @param {Object} data información a devolver
 * @param {String} msg mensaje personalizado de la respuesta
 */
function buildCreatedResponse (res, data, msg) {
  return buildResponse(res, HttpStatus.CREATED, msg, data)
}

/**
 * construye la estructura de la respuesta de una solicitud con error
 * @param {*} res objeto res de http de respuesta
 * @param {Number} status codigo de error
 * @param {String} msg mensaje personalizado de la respuesta
 * @param {String} error mensaje de error
 */
function buildErrorResponse (res, status, msg, error) {
  return buildResponse(res, status, msg, null, error)
}

/**
 *
 * @param {*} res objeto res de http de respuesta
 * @param {Number} status codigo de error
 * @param {String} msgg  mensaje personalizado de la respuesta
 * @param {String} data información a devolver
 * @param {String} error mensaje de error
 */
function buildResponse (res, status, msgg, data, error) {
  let ok = false
  let msg = msgg || HttpStatus.getStatusText(status)
  let resp = {}
  // es un estado ok ?
  if (status >= HttpStatus.OK && status < HttpStatus.MULTIPLE_CHOICES) { ok = true }

  resp.ok = ok
  resp.message = msg

  if (data && ok) { resp.data = data }
  if (error && !ok) { resp.error = error }

  return res.status(status).send(resp)
}

module.exports = {
  buildOkResponse,
  buildErrorResponse,
  buildAcceptedResponse,
  buildOkPaginationResponse,
  buildPaginationResponse,
  buildCreatedResponse
}
