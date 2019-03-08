'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const createError = require('http-errors')

/**
 * verifica el token cuando se envía a través de un header
 */
exports.verifyToken = function (req, res, next) {
	let token = req.headers.authorization;
	// se uqita la cabecera de bearer 
	if (token && token.startsWith("Bearer ")) {
		token = token.substring(7)
	}
	verifyTokenFn(token, res, req, next);
};

/**
 * verifica el token cuando se envía a través de un parametro query
 */
exports.verifyTokenByQuery = function (req, res, next) {
	let token = req.query.token;
	verifyTokenFn(token, res, req, next);
};

/**
 * Verifica si el token es válido
 * @param {*} token token
 * @param {*} res
 * @param {*} req
 * @param {*} next
 */
function verifyTokenFn(token, res, req, next) {
	if (!token) {
		throw createError.Forbidden('Error de autenticación!')
	}

	try {
		var payload = jwt.decode(token, process.env.JWT_SEED);
		if (payload.exp <= moment().unix()) {
			throw createError.Unauthorized('El token ha exirado');
		}
	} catch (ex) {
		throw createError.Unauthorized('El token no es válido');
	}

	req.usr = payload;
	next();
}
