const mysql = require("mysql");
require("dotenv").config();

const connectDb = mysql.createConnection({
  hostname: process.env.HOSTNAME,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

// --- Conexion a la base de datos -----
connectDb.connect((req, res, err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Conectado a db 📚");
  }
});

module.exports = connectDb;
