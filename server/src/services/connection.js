const mysql = require('mysql')

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_secretaria_fatec_ipiranga"
})

module.exports = db