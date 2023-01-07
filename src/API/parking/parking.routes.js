const ParkingRoutes = require("express").Router();

const {
  getAllPlazas,
  getById,
  deleteById,
  updateById,
  desocuparById,
} = require("./parking.controller");

ParkingRoutes.get("/plazas", getAllPlazas);
ParkingRoutes.get("/plazas/:id", getById);
ParkingRoutes.delete("/plazas/:id", deleteById);
ParkingRoutes.post("/plazas/:id", updateById);
ParkingRoutes.post("/plazas/vaciar/:id", desocuparById);

module.exports = ParkingRoutes;
