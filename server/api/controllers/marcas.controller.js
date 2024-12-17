import * as service from "../../services/marcas.service.js"

export function getMarcas(req,res){
    const marca = req.query
    service.getMarcas(marca)
        .then( (marca) => res.status(200).json(marca) )
}

export function getMarcaById(req, res) {
    const id = req.params.id;
    service.getMarcaId(id)
      .then((vehiculo) => {
        if (!vehiculo) {
          return res.status(404).json({ message: "Marca no encontrada" });
        }
        res.status(200).json(vehiculo);
      })
      .catch((err) => res.status(500).json({ message: "Error del servidor" }));
  }