'use strict'
const sequelize = require('sequelize');

module.exports = function setupUser(TransactionModel) {

  async function create(createModel) {
    const transaction = await TransactionModel.create(createModel);
    if (transaction.toJSON) {
      return transaction.toJSON();
    }
    return transaction
  }

  function findById(id) {
    return TransactionModel.findByPk(id);
  }

  function findByUserId(userId) {
    return TransactionModel.findAll({
      where: {
        user_id: userId
      },
      order: [
        ['created_date', 'DESC'],
        ['transaction_id', 'DESC']
      ],
      raw: true
    });
  }

  async function findPaginationByUserId(userId, limit, page) {
    limit = limit || 50
    page = page || 0
    let offset = limit * page
    let resp = await TransactionModel.findAll({
      limit,
      offset,
      where: {
        user_id: userId
      },
      order: [
        ['created_date', 'DESC'],
        ['transaction_id', 'DESC']
      ]
    });
    const cnt = await count({ user_id: userId })
    return {
      totalCount: cnt,
      count: resp.length,
      limit,
      page,
      data: resp
    }
  }

  async function count(where) {
    return (await TransactionModel.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'cant']],
      where
    }))[0].cant;
  }

  async function update(id, model) {
    await TransactionModel.update(model, { returning: true, where: { transaction_id: id } });
    findById(id)
  }

  function sumPoints(condition) {
    return TransactionModel.sum('points', { where: condition })
  }

  return {
    create,
    findById,
    update,
    findByUserId,
    findPaginationByUserId,
    sumPoints
  }
}