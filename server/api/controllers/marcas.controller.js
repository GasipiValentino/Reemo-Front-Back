// controllers/marcas.controller.js
import * as service from "../../services/marcas.service.js";

async function getMarcas(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    console.log("Request recibido - page:", page, "limit:", limit);

    const filtros = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const { marcas, totalPages } = await service.getMarcas(filtros);

    console.log("Respuesta enviada correctamente.");
    res.status(200).json({ marcas, totalPages });
  } catch (error) {
    console.error("Error en el controlador de marcas:", error.message);
    res.status(500).json({ mensaje: "Error al obtener marcas", error: error.message });
  }
}

export { getMarcas };

