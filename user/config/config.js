// ===============================
// = PUERTO
// ===============================
process.env.PORT = process.env.PORT || 3000
// ===============================
// = MYSQL
// ===============================
process.env.DB_USER = process.env.DB_USER || 'root'
process.env.DB_PSW = process.env.DB_PSW || 'root'
process.env.DB_PORT = process.env.DB_PORT || 3307
process.env.DB_HOST = process.env.DB_HOST || 'localhost'
process.env.DB_NAME = process.env.DB_NAME || 'leal'
// ===============================
// = JWT
// ===============================
process.env.JWT_EXPIRED = process.env.JWT_EXPIRED || 24 // 24 horas
process.env.JWT_SEED = process.env.JWT_SEED || 'ys!a7t8ZY@-g%hgBtYqVw2jM&A&rJCR33xwqdzxLwVMzVNF5Bc'
