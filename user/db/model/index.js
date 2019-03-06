'use strict'
const { setupDatabase } = require('../../config/config.db');
const setupUserModel = require('../model/user.entity');
const setupUser = require('../dao/user.dao');
var db = {}

console.log(setupDatabase);


const sequalize = setupDatabase()
const user = setupUserModel()

db.sequalize = sequalize
db.user = setupUser(user)

module.exports = db