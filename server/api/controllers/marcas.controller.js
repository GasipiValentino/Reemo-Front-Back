import * as service from "../../services/marcas.service.js"

export function getMarcas(req,res){
    const marca = req.query
    service.getMarcas(marca)
        .then( (marca) => res.status(200).json(marca) )
}

