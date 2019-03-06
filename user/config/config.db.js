const Sequelize = require('sequelize');
const debug = require('debug')('legal:db')
const defaults = require('defaults')

let sequelize = null;

module.exports.setupDatabase = function (config) {

  config = defaults(config, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: d => debug(d),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  if (!sequelize) {
    sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PSW, config)
  }
  return sequelize
}
/*
sequelize
  .authenticate()
  .then(() => {
    debug(`${chalk.green('[legal-db]')} Connection has been established successfully`)
  })
  .catch(err => {
    debug(`${chalk.red('[legal-db]')} Unable to connect to the database. ${err}`)
  })
  */