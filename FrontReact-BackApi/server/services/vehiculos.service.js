import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv";

dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")

async function getVehiculos( filtros = {} ){
  // Excluir productos eliminados
  const filterMongo = { eliminado: { $ne: true } };

  // Filtro por rango de precio
  if( filtros.precioMayor !== undefined && filtros.precioMenor !== undefined ){
    filterMongo.$and = [
        { precio: { $gte: parseInt(filtros.precioMayor) } }, 
        { precio: { $lte: parseInt(filtros.precioMenor) } } 
      ]
  }else if( filtros.precioMayor !== undefined ){
      filterMongo.precio = { $gte: parseInt(filtros.precioMayor) }
  }else if( filtros.precioMenor !== undefined ){
      filterMongo.precio = { $lte: parseInt(filtros.precioMenor) }
  }

  // Filtro año
  if( filtros.año !== undefined ){
    filterMongo.año = parseInt(filtros.año);
  }

  // Filtro por marca
  if( filtros.marca !== undefined ){
      filterMongo.marca = filtros.marca;
  }
   // Parámetros de paginación
   const page = parseInt(filtros.page) || 1;
   const limit = parseInt(filtros.limit) || 8;
   const skip = (page - 1) * limit;
 
   try {
     await cliente.connect();
 
     // Obtener vehículos con paginación
     const autos = await db.collection("vehiculos")
       .find(filterMongo)
       .skip(skip)
       .limit(limit)
       .toArray();
 
     // Obtener el total de documentos para calcular el total de páginas
     const total = await db.collection("vehiculos").countDocuments(filterMongo);
     const totalPages = Math.ceil(total / limit);
 
     return { autos, totalPages };
   } catch (error) {
     console.error("Error al obtener vehículos:", error);
     throw error;
   }
/*   console.log(filtros)
  await cliente.connect()
  return db.collection("vehiculos").find(filterMongo).toArray() */
}

async function getVehiculosMarca( filtros = {} ){
  // Excluir productos eliminados
  const filterMongo = { eliminado: { $ne: true } };

  // Filtro por marca
  if( filtros.marca !== undefined ){
      filterMongo.marca = filtros.marca;
  }

  console.log(filtros)
  await cliente.connect()
  return db.collection("vehiculos").find(filterMongo).toArray()
}

async function getVehiculoId(id_ingresado){
  console.log(id_ingresado)
  await cliente.connect()
  return db.collection("vehiculos").findOne({ _id: new ObjectId(id_ingresado)})
}

async function agregarVehiculo(vehiculo){

  // const nuevoVehiculo = {
  //   "marca": vehiculo.modelo,
  //   "modelo": vehiculo.marca,
  //   "colores": vehiculo.colores,
  //   "img": vehiculo.img,
  //   "link": vehiculo.link,
  //   "eliminado": vehiculo.eliminado,
  //   "año": vehiculo.año,
  //   "precio": vehiculo.precio,
  //   "descripcion": vehiculo.descripcion
  // }

  try {
    await cliente.connect()
    await db.collection("vehiculos").insertOne(vehiculo)
    return vehiculo
  } catch (error) {
    console.error(error)
  }
}

async function borrarVehiculoLogico(id){
  await cliente.connect()
  return db.collection("vehiculos").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } } )
}

async function editarVehiculo(id, vehiculoNuevo){
  await cliente.connect()
  return db.collection("vehiculos").replaceOne({ _id: new ObjectId(id) }, vehiculoNuevo)   
}

async function modificarVehiculo(id, vehiculoAct){
  await cliente.connect()
  return db.collection('vehiculos').replaceOne({
    _id: new ObjectId(id)},vehiculoAct
  )
}

async function actualizarVehiculo(id, vehiculoAct){
  const objectId = new ObjectId(id);
  await cliente.connect()
  return db.collection("vehiculos").updateOne({ _id: objectId }, { $set: vehiculoAct })
}

export { 
  getVehiculos, 
  getVehiculoId,
  agregarVehiculo,
  borrarVehiculoLogico,
  editarVehiculo,
  modificarVehiculo,
  actualizarVehiculo,
  getVehiculosMarca
}

export default { 
  getVehiculos, 
  getVehiculoId,
  agregarVehiculo,
  borrarVehiculoLogico,
  editarVehiculo,
  modificarVehiculo,
  actualizarVehiculo,
  getVehiculosMarca
}