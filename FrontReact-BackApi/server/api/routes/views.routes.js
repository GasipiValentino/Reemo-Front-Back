import express from "express"
import * as controllers from "../controllers/vehiculos.controller.js"
import { validateVehiculos } from "../../middleware/vehiculo.validate.middleware.js"
import { validateToken } from "../../middleware/token.middleware.js"

const route = express.Router()

route.get("/vehiculos",  [validateToken], controllers.getVehiculos)
route.get("/vehiculos/:id", [validateToken],  controllers.getVehiculosId)
route.post("/vehiculos", [validateVehiculos, validateToken], controllers.crearVehiculo)
route.delete("/vehiculo/:id", [validateToken], controllers.borrarVehiculo)
route.put("/vehiculo/:id", [validateToken], controllers.reemplazarVehiculo)  //reemplaza
route.patch("/vehiculo/:id", [validateToken], controllers.actualizarVehiculo) //actualiza

export default route