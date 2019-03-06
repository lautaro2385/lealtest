'use strict'

module.exports = function setupUser(UserModel) {

  async function create(createModel) {
    const user = await UserModel.create(createModel);
    return user.toJSON();
  }

  function findByUserId(userId) {
    return UserModel.findById(userId);
  }

  return {
    create,
    findByUserId
  }
}