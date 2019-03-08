module.exports = {
  development: {
    username: process.env.DB_USER_TR,
    password: process.env.DB_PSW_TR,
    database: process.env.DB_NAME_TR,
    host: process.env.DB_HOST_TR,
    port: process.env.DB_PORT_TR,
    dialect: 'mysql'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: () => { }
  },
  production: {
    username: process.env.DB_USER_TR,
    password: process.env.DB_PSW_TR,
    database: process.env.DB_NAME_TR,
    host: process.env.DB_HOST_TR,
    port: process.env.DB_PORT_TR,
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
}
