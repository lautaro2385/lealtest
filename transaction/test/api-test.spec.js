'use strict'
const moment = require('moment');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const userFixtures = require('./fixtures/user');
const { FORMAT_DATE } = require('../config/constants');
const md5 = require('md5');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

chai.use(chaiAsPromised);
const assert = chai.assert;

let single = Object.assign({}, userFixtures.single2)
let single1 = Object.assign({}, userFixtures.single1)

let sandbox = null
let app = null
let dbStub = {}
let UserStub = {}

describe('pruebas api', () => {

  beforeEach(async () => {
    sandbox = sinon.createSandbox()

    const sequalizeStub = {}
    sequalizeStub.sync = sandbox.stub();
    sequalizeStub.sync.returns(Promise.resolve("ok"))

    dbStub.user = UserStub
    UserStub.findByUserId = sandbox.stub()
    UserStub.findByUserId.withArgs(single.user_id).returns(Promise.resolve(undefined))
    UserStub.findByUserId.withArgs(single1.user_id).returns(Promise.resolve(userFixtures.single1ToDb))
    UserStub.create = sandbox.stub()
    UserStub.create.withArgs(sinon.match({ user_id: single.user_id })).returns(Promise.resolve(userFixtures.single2ToDb.toJSON()))

    const bcryptStub = {}
    bcryptStub.hashSync = sandbox.stub()
    bcryptStub.hashSync.withArgs(single.password).returns(userFixtures.single2ToDb.password)
    bcryptStub.compareSync = sandbox.stub()
    bcryptStub.compareSync.withArgs(single1.password, userFixtures.single1ToDb.password).returns(true)

    const userControllerStub = proxyquire('../controller/user.controller', {
      '../db/model': dbStub,
      'bcrypt-nodejs': bcryptStub
    })

    const userRouteStub = proxyquire('../routes/user.route', {
      '../controller/user.controller': userControllerStub
    })

    app = proxyquire('../index', {
      './db/model': dbStub,
      './routes/user.route': userRouteStub
    })
  })

  afterEach(() => {
    sandbox && sandbox.restore()
  })

  it('POST /user', (done) => {
    request(app)
      .post('/user')
      .send(single)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        assert.isTrue(res.body.ok, "respuesta debe ser ok")
        assert.equal(res.body.message, "Created", "El mensaje deb ser creado")
        assert(res.body.data, "debe haber informacion del usuario")
        assert.deepEqual(res.body.data, userFixtures.single2ToDb.toJSON())
        done();
      });
  })

  it('no se permite usuarios que ta existan', (done) => {
    request(app)
      .post('/user')
      .send(single1)
      .set('Accept', 'application/json')
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        assert.isFalse(res.body.ok, "respuesta debe ser false")
        assert.equal(res.body.message, "El usuario ya existe!", "El mensaje deb ser El usuario ya existe!")
        done();
      });
  })

  it('POST /login', (done) => {
    request(app)
      .post('/login')
      .send(userFixtures.loginData)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.isTrue(res.body.ok, "respuesta debe ser ok")
        assert.equal(res.body.message, "OK", "El mensaje deb ser OK")
        assert(res.body.data, "debe haber informacion de respuesta")
        assert(res.body.data.user, "debe haber informacion del usuario")
        assert(res.body.data.token, "debe haber informacion del token")
        assert.deepEqual(res.body.data.user, userFixtures.single1ToDb.toJSON())
        done();
      });
  })
})