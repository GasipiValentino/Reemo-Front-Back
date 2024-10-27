// Vamos a usar yup para validar los datos, queremos que se ejecute después de la consulta, pero antes del controlador
import yup from "yup"

export const vehiculoSchema = yup.object({
    marca: yup.string().required(),
    modelo: yup.string().required(),
    colores: yup.string().required(),
    img: yup.string().required(),
    link: yup.string().required(),
    descripcion: yup.string().min(35).max(500).required(),
    precio: yup.number().positive().required(),
    año: yup.number().required().positive(),

})