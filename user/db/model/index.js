'use strict'
const { setupDatabase } = require('../setupDB');
const setupUserModel = require('../model/user.entity');
const setupUser = require('../dao/user.dao');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.db')[env];
var db = {}

const sequalize = setupDatabase(config)
const user = setupUserModel(config)

db.sequalize = sequalize
db.user = setupUser(user)

module.exports = db