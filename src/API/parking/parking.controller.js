const getAll = require("../../helpers/data");
const plazas = getAll();

const imprimir = () => {
  console.log(plazas);
};

module.exports = imprimir;
