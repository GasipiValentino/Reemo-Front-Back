import * as service from "../../services/vehiculos.service.js"

async function getVehiculos(req, res){
  const { page = 1, limit = 8 } = req.query;

  try {
      const filtros = {
          page: parseInt(page),
          limit: parseInt(limit),
      };
      
      const { autos, totalPages } = await service.getVehiculos(filtros);
      
      res.status(200).json({ autos, totalPages });
  } catch (error) {
      console.error("Error al obtener vehículos:", error);
      res.status(500).json({ mensaje: "Error al obtener vehículos" });
  }
}

const getVehiculosMarca = (req, res) => {
    const { marca } = req.query;
    const filtros = { marca };
  
      service.getVehiculosMarca(filtros)
          .then((vehiculos)=> res.send(views.createPage("Vehículos", views.crearListadoMarca(vehiculos))) )
          .catch(err => res.status(500).send(`<p>No existen vehículos de esa marca</p> <a href="/vehiculos">Volver al inicio</a> `));
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
    console.log('ID recibido:', id);
    console.log('Vehiculo recibido:', vehiculo);

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
    actualizarVehiculo,
    getVehiculosMarca
}