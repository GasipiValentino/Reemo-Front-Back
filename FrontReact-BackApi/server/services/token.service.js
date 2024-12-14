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
        console.log("Validando token:", token);
        const payload = jwt.verify(token, secretKey);
        console.log("Payload decodificado:", payload);

        const session = await tokens.findOne({ token, usuario_id: new ObjectId(payload._id) })
        console.log("Sesión encontrada:", session);

        if (!session) {
            console.error("Sesión no encontrada para el token proporcionado");
            throw new Error("Usuario no autorizado");
        }

        const horaActual = new Date().getTime() / 1000;
        console.log("Hora actual:", horaActual, "Exp:", payload.exp);
        if(payload.exp < horaActual){
            console.error("Token expirado");
            throw new Error("Token Expirado");
        }
        return payload
    } catch (error) {
        console.error("Error en validateToken:", error.message);
        throw new Error("No autorizado");
    }
}