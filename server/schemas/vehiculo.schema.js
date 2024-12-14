// Vamos a usar yup para validar los datos, queremos que se ejecute después de la consulta, pero antes del controlador
import yup from "yup"

export const vehiculoSchema = yup.object({
    marca: yup.string("El campo marca debe ser texto").required("El campo marca es requerido"),
    modelo: yup.string("El campo modelo debe ser texto").required("El campo modelo es requerido"),
    colores: yup.string("El campo colores debe ser texto").required("El campo colores es requerido"),
    img: yup.string("El campo imágen debe ser texto").required("El campo img es requerido"),
    link: yup.string("El campo link debe ser texto").required("El campo link es requerido"),
    descripcion: yup
      .string("El campo descripción debe ser texto")
      .min(35, "La descripción debe tener al menos 35 caracteres")
      .max(500, "La descripción debe tener 500 caracteres como máximo")
      .required("El campo descripción es requerido"),
    precio: yup
      .number("El campo precio debe ser un número")
      .transform((value, originalValue) => (originalValue === '' ? undefined : Number(originalValue)))
      .positive("El precio debe ser un número positivo")
      .required("El campo precio es requerido"),
    año: yup
      .number("El campo año debe ser un número")
      .transform((value, originalValue) => (originalValue === '' ? undefined : Number(originalValue)))
      .positive("El año debe ser un número positivo")
      .required("El campo año es requerido"),
  });
  