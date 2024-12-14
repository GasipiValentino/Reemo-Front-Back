import { MongoClient } from "mongodb"
import dotenv from "dotenv";


dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")

export async function getMarcas(){
    await cliente.connect();
    return db.collection("marcas").find().toArray()
}