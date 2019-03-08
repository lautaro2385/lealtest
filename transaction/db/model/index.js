'use strict'
const { setupDatabase } = require('../setupDB')
const setupTransactionModel = require('./transaction.entity')
const setupUser = require('../dao/transaction.dao')
const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.db')[env]
var db = {}

const sequalize = setupDatabase(config)
const transaction = setupTransactionModel(config)

db.sequalize = sequalize
db.transaction = setupUser(transaction)

module.exports = db
