import yup from "yup"

export const marcaSchema = yup.object({
    marca: yup.string("El campo marca debe ser texto").
               required("El campo marca es requerido").
               min(2, "La marca debe tener al menos 2 caracteres").
               max(30, "La descripción debe tener 30 caracteres como máximo"),
  });