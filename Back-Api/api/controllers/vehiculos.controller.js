import * as service from "../../services/vehiculos.service.js"
import * as views from "../../views/index.js";

async function getVehiculos(req, res){

    const filtros = req.query
    service.getVehiculos(filtros)
    .then( (vehiculos) => res.status(200).json(vehiculos) )
}

function getVehiculosId(req, res){
    const id = req.params.id
    service.getVehiculoId(id)
        .then( (vehiculos) => res.status(200).json(vehiculos) )
}

function crearVehiculo(req, res){
    const vehiculo = req.body
    service.agregarVehiculo(vehiculo)
        .then( (vehiculo) => res.status(201).json(vehiculo) )
}

function borrarVehiculo(req, res){
    const id = req.params.id
    service.borrarVehiculoLogico(id)
        .then( () => res.status(204).json(id) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

function reemplazarVehiculo(req, res){
    const id = req.params.id
    const vehiculo = req.body
    service.modificarVehiculo(id, vehiculo)
        .then( (vehiculo) => res.status(204).json(vehiculo) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

function actualizarVehiculo(req, res){
    const id = req.params.id
    const vehiculo = req.body

    service.actualizarVehiculo(id, vehiculo)
    .then( (vehiculo) => res.status(204).json(vehiculo) )
    .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )

}

export {
    getVehiculos,
    getVehiculosId,
    crearVehiculo,
    borrarVehiculo,
    reemplazarVehiculo,
    actualizarVehiculo
}