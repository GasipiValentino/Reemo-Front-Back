import { MongoClient, ObjectId } from "mongodb"
import dotenv, { decrypt } from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { crearToken } from "./token.service.js";

dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")

export async function getUsuarios(){
    await cliente.connect();
    return db.collection("usuarios").find().toArray()
}

export async function agregarUsuario(usuario){
    await cliente.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
        
    if( existe ) {
        throw new Error("Ya existe una cuenta con estos datos")
    }    

    const usuarioNuevo = { ...usuario }
    
    usuarioNuevo.password = await bcrypt.hash( usuario.password, 10)

    await db.collection("usuarios").insertOne(usuarioNuevo)

    return usuarioNuevo
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

export async function login(usuario){

        await cliente.connect()
        const existe = await db.collection("usuarios").findOne({ email: usuario.email })

        if( !existe ) throw new Error( "Usuario inexistente" )

        // if( usuario.password != existe.password ){
        //     throw new Error( "Los datos no son correctos" )
        // }

        const esValido = await bcrypt.compare(usuario.password, existe.password)

        if( !esValido ){
            throw new Error( "Los datos no son correctos" )
        }

        // name = payload y clave secreta es mi jwt
        const token = await crearToken(existe)

        console.log(token)


        return { ...existe, token: token ,password:undefined }

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