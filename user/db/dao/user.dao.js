'use strict'

module.exports = function setupUser(UserModel) {

  async function create(createModel) {
    const user = await UserModel.create(createModel);
    if (user.toJSON) {
      return user.toJSON();
    }
    return user
  }

  function findByUserId(userId) {
    return UserModel.findByPk(userId);
  }

  return {
    create,
    findByUserId
  }
}