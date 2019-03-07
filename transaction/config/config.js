// ===============================
// = PUERTO
// ===============================
process.env.PORT = process.env.PORT || 3001
// ===============================
// = MYSQL
// ===============================
process.env.DB_USER_TR = process.env.DB_USER_TR || 'root'
process.env.DB_PSW_TR = process.env.DB_PSW_TR || 'root'
process.env.DB_PORT_TR = process.env.DB_PORT_TR || 3307
process.env.DB_HOST_TR = process.env.DB_HOST_TR || 'localhost'
process.env.DB_NAME_TR = process.env.DB_NAME_TR || 'leal'
// ===============================
// = JWT
// ===============================
process.env.JWT_EXPIRED = process.env.JWT_EXPIRED || 24 // 24 horas
process.env.JWT_SEED = process.env.JWT_SEED || 'ys!a7t8ZY@-g%hgBtYqVw2jM&A&rJCR33xwqdzxLwVMzVNF5Bc'
