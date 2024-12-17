import express from "express"
import * as controllers from "../controllers/marcas.controller.js"
import { validateToken } from "../../middleware/token.middleware.js"

const route = express.Router()

route.get("/marcas", [validateToken], controllers.getMarcas)
route.get("/marca/:id", [validateToken], controllers.getMarcaById)

export default route 