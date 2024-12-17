import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv";

dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL)
const db = cliente.db("Reemo")

export async function getMarcas(){
    await cliente.connect();
    return db.collection("marcas").find().toArray()
}

export async function getMarcaId(id_ingresado) {
  console.log(id_ingresado);
  await cliente.connect();
  return db.collection("marcas").findOne({ _id: new ObjectId(id_ingresado) });
}