const Sequelize = require('sequelize')
const debug = require('debug')('legal:db')
const defaults = require('defaults')

let sequelize = null

module.exports.setupDatabase = function (config) {
  config = defaults(config, {
    operatorsAliases: false,
    logging: d => debug(d),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  if (!sequelize) {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
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
