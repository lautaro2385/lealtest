'use strict'
const moment = require('moment');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const app = require('../index');
const userFixtures = require('./fixtures/user');
const { FORMAT_DATE } = require('../config/constants');
const md5 = require('md5');

chai.use(chaiAsPromised);
const assert = chai.assert;

let single = Object.assign({}, userFixtures.single)
single.birth_date = moment(single.birth_date).format(FORMAT_DATE)

const db = require('../db/model')

describe('pruebas api', () => {

  beforeEach(async () => {
    await db.sequalize.sync({ force: true })
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
        assert.equal(res.body.data.birth_date, single.birth_date, "Fecha de nacimiento")
        assert.equal(res.body.data.email, single.email, "mail")
        assert.equal(res.body.data.lastname, single.lastname, "apellido")
        assert.equal(res.body.data.name, single.name, "nombre")
        assert.equal(res.body.data.user_id, md5(single.email), "El id del usuario dee ser el md5 del correo")
        assert.isUndefined(res.body.data.password, "no debe venier el password")
        done();
      });
  })

  it('POST /login', (done) => {
    request(app)
      .post('/user')
      .send(single)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        request(app)
          .post('/login')
          .send(userFixtures.loginData)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isTrue(res.body.ok, "respuesta debe ser ok")
            assert.equal(res.body.message, "OK", "El mensaje deb ser OK")
            assert(res.body.data, "debe haber informacion del usuario")
            //assert.equal(res.body.data.birth_date, single.birth_date, "Fecha de nacimiento")
            assert.equal(res.body.data.email, single.email, "mail")
            assert.equal(res.body.data.lastname, single.lastname, "apellido")
            assert.equal(res.body.data.name, single.name, "nombre")
            assert.equal(res.body.data.user_id, md5(single.email), "El id del usuario dee ser el md5 del correo")
            //assert.isUndefined(res.body.data.password, "no debe venier el password")
            done();
          });
      });
  })
})