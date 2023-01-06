const mysql = require("mysql");
require("dotenv").config();

const connectDb = mysql.createConnection({
  hostname: process.env.HOSTNAME,
  user: process.env.USER,
  database: process.env.DATABASE,
});

connectDb.connect((req, res, err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Conectado a db 📚");
  }
});

module.exports = connectDb;
