const Sequelize = require('sequelize');
const { setupDatabase } = require('../setupDB');
const { FORMAT_DATE, FORMAT_DATETIME } = require('../../config/constants');
const moment = require('moment');

module.exports = function (config) {
  const sequelize = setupDatabase(config)
  const User = sequelize.define('user', {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    /*created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },*/
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
      createdAt: 'created_date',
      updatedAt: 'updated_date',
    })
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // evita que el password se devuelva en alguna llamada no deseada
    delete values.password;
    if (values.updated_date) { values.updated_date = moment(values.updated_date).format(FORMAT_DATETIME); }
    if (values.created_date) { values.created_date = moment(values.created_date).format(FORMAT_DATETIME); }
    if (values.birth_date) { values.birth_date = moment(values.birth_date).format(FORMAT_DATE); }
    return values;
  }
  return User
}