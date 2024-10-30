import { MongoClient, ObjectId } from "mongodb"
import dotenv, { decrypt } from "dotenv";
import jwt from "jsonwebtoken"

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")
const tokens = db.collection("tokens")
const secretKey = "REEMO"

export async function crearToken(usuario){
    const token = jwt.sign({...usuario, password:undefined}, secretKey, {expiresIn: "2h"})

    await cliente.connect()

    await tokens.insertOne({token: token, usuario_id: usuario._id})
    return token
}

export async function validateToken(token){
    try {
        const payload = jwt.verify(token,  secretKey)
        const session = await tokens.findOne({ token, usuario_id: new ObjectId(payload._id) })
        if (!session) {
            throw new Error("Usuario no autorizado");
        }
        // Divido por mil para tener segundo y no milisigendos,. Ya que iat trabaja con segundos
        const horaActual = new Date().getTime() / 1000
        if(payload.exp < horaActual){
            throw new Error("Token Expirado");
        }
        return payload
    } catch (error) {
        throw new Error("No autorizado");
        
    }
}