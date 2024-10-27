import express from "express"
import * as controllers from "../controllers/vehiculos.controller.js";
import * as usuarios from "../controllers/usuarios.controller.js";

const route = express.Router()

route.get("/vehiculos", controllers.getVehiculos)
route.get("/vehiculos/:id", controllers.getVehiculoId)
route.get("/vehiculo/nuevo", controllers.formVehiculo)
route.post("/vehiculo/nuevo", controllers.agregarVehiculo)
route.get("/vehiculo/eliminar/:id", controllers.eliminarVehiculo)
route.get("/vehiculo/editar/:id", controllers.formEditarVehiculo)
route.post("/vehiculo/editar/:id", controllers.editarVehiculo)
route.get("/vehiculo", controllers.getVehiculosMarca)

route.get("/usuarios", usuarios.getUsuarios)
route.get("/usuario/:id", usuarios.getUsuarioId)
route.post("/usuario/:id/historial", usuarios.agregarAlHistorial)

export default route