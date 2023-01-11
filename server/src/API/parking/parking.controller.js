const connectDb = require("../../helpers/db");
const { setError } = require("../../helpers/utils");

let plazas;

// ----Hacemos una consulta de toda la BDO ---------
const init = () => {
  connectDb.query("SELECT * FROM parking", (error, results, fields) => {
    if (error) {
      throw error;
    } else {
      plazas = results;
    }
  });
};

init();
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const getAllPlazas = async (req, res, next) => {
  res.type("application/json");
  res.json(plazas);
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

const getById = async (req, res, next) => {
  const { id } = req.params;
  const plaza = plazas.find((plaza) => plaza.id == id);
  if (!plaza) return next(setError(404, "Plaza no encontrada"));
  res.type("application/json");
  res.json(plaza);
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

const deleteById = async (req, res) => {
  const { id } = req.params;
  const plaza = plazas.filter((plaza) => plaza.id !== id);
  res.type("application/json");
  res.json(plaza);
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
const updateById = async (req, res) => {
  const { id } = req.params;
  let plaza = req.body;
  connectDb.query(
    `UPDATE parking SET ocupada=${plaza.ocupada} , matricula="${
      plaza.matricula != undefined ? plaza.matricula : ""
    }" , marca="${plaza.marca != undefined ? plaza.marca : ""}" , modelo="${
      plaza.modelo != undefined ? plaza.modelo : ""
    }"  WHERE id="${id}"`,
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        plaza = results;
        init();
      }
    }
  );
  res.type("application/json");
  res.json(plaza);
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
const desocuparById = async (req, res) => {
  const { id } = req.params;
  const plaza = plazas.find((plaza) => plaza.id == id);
  plaza.ocupada = false;
  res.type("application/json");
  res.json(plaza);
};
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

module.exports = {
  getAllPlazas,
  getById,
  deleteById,
  updateById,
  desocuparById,
};
