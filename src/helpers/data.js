const connectDb = require("./db");
let plazas;

const getAll = () => {
  connectDb.query("SELECT * FROM parking", (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      plazas = results;
    }
  });
};

module.exports = getAll;
