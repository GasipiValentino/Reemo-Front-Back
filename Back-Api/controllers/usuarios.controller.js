import * as services from "../services/usuarios.service.js";
import * as vehiculoServices from "../services/vehiculos.service.js";
import * as views from "../views/index.js";

const getUsuarios = (req, res) => {
  services.getUsuarios()
      .then((usuarios)=> res.send(views.createPage("Vehículos", views.crearListadoUsuarios(usuarios))) )
      .catch(err => res.status(500).send(`<p>Error al obtener los usuarios</p> <a href="/vehiculos">Volver al inicio</a> `));
}

const getUsuarioId = (req, res) => {
  const id = req.params.id
  Promise.all([
    services.getUsuarioId(id),     
    vehiculoServices.getVehiculos()
  ])
  .then(([usuario, vehiculosDisponibles]) => {
    res.send(views.createPage("Usuario", views.createUsuarioDetalle(usuario, vehiculosDisponibles)));
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(`<p>Error al obtener el usuario o los vehículos</p> <a href="/usuarios">Volver a usuarios</a>`);
  });
}

const agregarAlHistorial = (req, res) => {
  const usuario = req.params.id
  const vehiculo = req.body
  console.log("LLEGUE", usuario, vehiculo)
  services.agregarAlHistorial(usuario, vehiculo)
    // .then( usuario => res.status(201).json(usuario) )
    .then(() => res.redirect("/usuario/" + usuario))
      .catch( () => res.status(404).json({ mensaje: "No se pudo agregar a carrito" }) )
}

export {
  getUsuarios,
  getUsuarioId,
  agregarAlHistorial
}