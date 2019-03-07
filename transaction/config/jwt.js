'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = process.env.JWT_SEED || 'ys!a7t8ZY@-g%hgBtYqVw2jM&A&rJCR33xwqdzxLwVMzVNF5Bc'

module.exports.SECRET = secret
module.exports.createToken = function (usr) {
  var payload = {
    sub: usr.user_id,
    name: usr.name,
    lastname: usr.lastname,
    mail: usr.email,
    iat: moment().unix(),
    exp: moment().add(process.env.JWT_EXPIRED, 'hours').unix()
  }
  return jwt.encode(payload, secret)
}
