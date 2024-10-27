// Vamos a usar yup para validar los datos, queremos que se ejecute después de la consulta, pero antes del controlador
import yup from "yup"

export const vehiculoSchema = yup.object({
    marca: yup.string().required("El campo marca es requerido"),
    modelo: yup.string().required("El campo modelo es requerido"),
    colores: yup.string().required("El campo colores es requerido"),
    img: yup.string().required("El campo img es requerido"),
    link: yup.string().required("El campo link es requerido"),
    descripcion: yup.string().min(35).max(500).required("El campo ddescripción es requerido"),
    precio: yup.number().positive().required("El campo precio es requerido"),
    año: yup.number().required("El campo año es requerido").positive(),

})