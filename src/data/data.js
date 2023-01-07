const connectDb = require("../helpers/db");
let plazas;

const getAll = async () => {
  await connectDb.query("SELECT * FROM parking", (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      plazas = results;
    }
  });

  return plazas;
};
module.exports = getAll;
