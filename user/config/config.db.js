module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: () => { }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
}
