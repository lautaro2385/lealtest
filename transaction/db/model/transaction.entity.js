const Sequelize = require('sequelize');
const { setupDatabase } = require('../setupDB');
const { FORMAT_DATETIME } = require('../../config/constants');
const moment = require('moment');

module.exports = function (config) {
  const sequelize = setupDatabase(config)
  const Transaction = sequelize.define('transaction', {
    transaction_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
      createdAt: 'created_date',
      updatedAt: 'updated_date',
      indexes: [
        {
          fields: ['created_date']
        }
      ]
    })
  Transaction.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // evita que el password se devuelva en alguna llamada no deseada
    delete values.password;
    if (values.updated_date) { values.updated_date = moment(values.updated_date).format(FORMAT_DATETIME); }
    if (values.created_date) { values.created_date = moment(values.created_date).format(FORMAT_DATETIME); }
    return values;
  }
  return Transaction
}