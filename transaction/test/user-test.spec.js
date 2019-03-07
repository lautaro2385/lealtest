'use strict'
const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const userFixtures = require('./fixtures/user');
let db = null;

chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;

let single = Object.assign({}, userFixtures.single)

describe('pruebas de usuario', () => {
  describe('pruebas de usuario DB', () => {
    const db = require('../db/model')

    beforeEach(async () => {
      await db.sequalize.sync({ force: true })
    })

    it('la entidad de usuario debe existir', () => {
      assert(db.user)
    })

    it('crea usuario en db', async () => {
      let resp = await db.user.create(single)
      assert.equal(resp.created_date, moment().format("YYYY-MM-DD HH:mm:ss"))
      assert.equal(resp.updated_date, moment().format("YYYY-MM-DD HH:mm:ss"))
      assert.equal(resp.email, single.email)
      assert.equal(resp.lastname, single.lastname)
      assert.equal(resp.name, single.name)
      assert.equal(resp.user_id, single.user_id)
      assert.equal(resp.birth_date, moment(single.birth_date).format("YYYY-MM-DD"))
      assert.isUndefined(resp.password, 'no se puede devolver el password')
    })

    it('no pemite id o correo repetido', async () => {
      const res = await db.user.create(single)
      assert(res, 'debe existir')
      expect(db.user.create(single)).to.eventually.throw();
    })

    it('user#findById', async () => {
      const resp = await db.user.create(single)
      assert(resp, 'debe existir')
      const user = await db.user.findByUserId(single.user_id);
      assert.equal(user.email, single.email)
      assert.equal(user.lastname, single.lastname)
      assert.equal(user.name, single.name)
      assert.equal(user.user_id, single.user_id)
      assert.equal(moment(new Date(user.birth_date)).format("YYYY-MM-DD"), moment(single.birth_date).format("YYYY-MM-DD"))
      assert.equal(user.password, single.password)
    })
  })
})