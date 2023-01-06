const connectDb = require("./db");
let plazas;

const getAll = () => {
  connectDb.query("SELECT * FROM parking", (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      plazas = results;
      console.log("Las plazas son: ", plazas);
    }
  });
};

module.exports = getAll;
