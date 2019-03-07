let user = {
  user_id: '1',
  name: 'Prueba',
  lastname: 'uno',
  birth_date: new Date(),
  email: 'prueba@uno.com',
  password: '123456'
}

module.exports = {
  single: user,
  loginData: { email: user.email, password: user.password }
}