/* global beforeEach, it, describe */
'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const trFixtures = require('./fixtures/transaction')

chai.use(chaiAsPromised)
const assert = chai.assert

let single = Object.assign({}, trFixtures.single)

describe('pruebas de transacciones', () => {
  describe('pruebas de trasnascciones DB', () => {
    const db = require('../db/model')

    beforeEach(async () => {
      await db.sequalize.sync({ force: true })
    })

    it('la entidad de transaccion debe existir', () => {
      assert(db.transaction)
    })

    it('crea transaccion en db', async () => {
      let resp = await db.transaction.create(single)
      assert.equal(resp.points, single.points)
      assert.equal(resp.status, single.status)
      assert.equal(resp.user_id, single.user_id)
      assert.equal(resp.value, single.value)
    })

    it('trasacción#findById', async () => {
      const resp = await db.transaction.create(single)
      assert(resp, 'debe existir')
      const tr = await db.transaction.findById(resp.transaction_id)
      assert.equal(tr.points, single.points)
      assert.equal(tr.status, single.status)
      assert.equal(tr.user_id, single.user_id)
      assert.equal(tr.value, single.value)
    })
  })
})
