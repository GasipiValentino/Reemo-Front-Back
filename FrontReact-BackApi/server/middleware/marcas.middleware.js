import { marcaSchema } from "../schemas/marca.schema.js"


// EL next indica si puede pasar o no
export async function validateMarcas( req, res, next ){

    try {
        const datosValidados = await marcaSchema.validate( req.body, {abortEarly: true, stripUnknown: true} )
        req.body = datosValidados
        next()
    }catch(err){
        res.status(400).json({ message: err.errors })         
    }
}