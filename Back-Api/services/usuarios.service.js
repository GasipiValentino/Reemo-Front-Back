import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv";

dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")

export async function getUsuarios(){
    await cliente.connect();
    return db.collection("usuarios").find().toArray()
}

export async function agregarUsuario(usuario){
    await cliente.connect()
    await db.collection("usuarios").insertOne(usuario)
    return usuario
}

export async function borrarUsuario(id){
    await cliente.connect();
    return db.collection("usuarios")
    .updateOne( {_id: ObjectId.createFromHexString(id)},
    {$set: {eliminado: true}}
)
}

export async function getUsuarioId(id){
  console.log(id)
  await cliente.connect()
  return db.collection("usuarios").findOne({ _id: new ObjectId(id)})
}

export async function agregarAlHistorial(idUsuario, vehiculo){
    await cliente.connect()
    const vehiculoCompleto = await db.collection( "vehiculos" ).findOne({ _id: ObjectId.createFromHexString(vehiculo._id) })
    console.log(vehiculoCompleto)
    const resultado = await db.collection("usuarios").updateOne(
        { _id: ObjectId.createFromHexString(idUsuario) },
        // { $push: {carrito: {$each: vehiculoCompleto}} } //...vehiculoCompleto
        { $push: {historial: vehiculoCompleto} }
    )

    return resultado.modifiedCount > 0 ? "Producto agregado" : "No se pudo agregar producto "
}