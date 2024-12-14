// services/marcas.service.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const cliente = new MongoClient(process.env.MONGO_DB_URL);
const db = cliente.db("Reemo");

async function getMarcas(filtros = {}) {
  const page = parseInt(filtros.page) || 1;
  const limit = parseInt(filtros.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    console.log("Conectando a MongoDB...");
    await cliente.connect();
    console.log("Conexión exitosa.");

    // Obtener marcas con paginación
    console.log(`Obteniendo marcas: skip=${skip}, limit=${limit}`);
    const marcas = await db
      .collection("marcas")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("marcas").countDocuments();
    const totalPages = Math.ceil(total / limit);

    console.log("Marcas obtenidas:", marcas);
    return { marcas, totalPages };
  } catch (error) {
    console.error("Error en el servicio de marcas:", error.message);
    throw error;
  } finally {
    await cliente.close(); // Cierra la conexión
    console.log("Conexión cerrada.");
  }
}

export { getMarcas };
