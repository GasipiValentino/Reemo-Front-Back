// Vamos a usar yup para validar los datos, queremos que se ejecute después de la consulta, pero antes del controlador
import { vehiculoSchema } from "../schemas/vehiculo.schema.js"


// EL next indica si puede pasar o no
export async function validateVehiculos( req, res, next ){

    try {
        const datosValidados = await vehiculoSchema.validate( req.body, {abortEarly: true, stripUnknown: true} )
        req.body = datosValidados
        next()
    }catch(err){
        res.status(400).json({ message: err.errors })         
    }
}
    // Al indicarle esto (despues de ponerlo en la ruta), le estamos diciendo que continue con el controlador
    // next()