import * as services from "../services/vehiculos.service.js";
import * as views from "../views/index.js";

const getVehiculos = (req, res) => {
  const precioMenor = parseInt(req.query.precioMenor) || 6500;
  const precioMayor = parseInt(req.query.precioMayor) || 30000;
  const año = parseInt(req.query.año) || '';

  // Obtener todos los vehículos desde el servicio
  services.getVehiculos()
    .then((vehiculos) => {
      // Filtrar los vehículos según los parámetros de precio
      const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
        const precioFilter = vehiculo.precio >= precioMenor && vehiculo.precio <= precioMayor;
        const añoFilter = año ? vehiculo.año === año : true;
        return precioFilter && añoFilter;
      });

      // Renderizar la página con los vehículos filtrados
      res.send(views.createPage(
        "Vehiculos", 
        views.crearListado(vehiculosFiltrados, { precioMenor, precioMayor, año }),
      ));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`<p>Error al obtener los vehículos</p> <a href="/vehiculos">Volver al inicio</a> `);
    });
};

const getVehiculosMarca = (req, res) => {
  const { marca } = req.query;
  const filtros = { marca };

    services.getVehiculosMarca(filtros)
        .then((vehiculos)=> res.send(views.createPage("Vehículos", views.crearListadoMarca(vehiculos))) )
        .catch(err => res.status(500).send(`<p>No existen vehículos de esa marca</p> <a href="/vehiculos">Volver al inicio</a> `));
}

const getVehiculoId = (req, res) => {
  const id = req.params.id
  services.getVehiculoId(id)
      .then( (vehiculo) => {
          console.log(vehiculo)
          res.send(views.createPage("Vehículo",views.createPaginaDetalle(vehiculo)))
      } )
      .catch( error => console.log(error) )
}

const formVehiculo = (req, res) => {
  res.send(views.createPage("Agregar Vehículo", views.nuevoVehiculo()))
}

const agregarVehiculo = (req, res) => {
  console.log(req.body);

  const { marca, modelo, colores, link, precio, año, descripcion, img } = req.body;
  if (!marca || !modelo || !colores || !precio || !año || !descripcion || !img) {
    return res.status(400).send("Faltan datos necesarios para agregar vehículo");
  }

  const vehiculo = {
    marca,
    modelo,
    colores,
    link,
    img: `${img}.jpg`,
    precio: parseInt(precio),
    año: parseInt(año),
    descripcion,
    eliminado: false        
  };

  services.agregarVehiculo(vehiculo)
    .then(() => res.redirect("/vehiculos"))
    .catch(err => res.status(500).send("Error al agregar el vehículo"));
};

const eliminarVehiculo = (req, res) => {
  const id = req.params.id
  services.borrarVehiculoLogico(id)
      .then( () => res.redirect("/vehiculos") )
}

const formEditarVehiculo = (req, res) => {
  const id = req.params.id
    services.getVehiculoId(id)
        .then( (vehiculo) => res.send(views.createPage( "Editar Vehículo", views.editarVehiculo(vehiculo) )) )
}

const editarVehiculo = (req, res) => {
  const id = req.params.id
  const vehiculos = req.body
  services.editarVehiculo(id, vehiculos)
      .then( () => res.redirect("/vehiculos") )
}

export { 
  getVehiculos, 
  getVehiculoId, 
  formVehiculo, 
  agregarVehiculo, 
  eliminarVehiculo, 
  formEditarVehiculo, 
  editarVehiculo,
  getVehiculosMarca
}