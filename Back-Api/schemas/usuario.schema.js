import yup from "yup"

export const usuarioSchema = yup.object({
    nombre: yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  
    // img: yup.mixed()
    //   .required("La imagen es requerida")
    // .test("fileFormat", "El formato no es válido, solo se aceptan JPG o PNG", (value) => {
    //   if (!value) return false;
    //   const acceptedFormats = ["image/jpeg", "image/png"];
    //   return acceptedFormats.includes(value.type);
    // }),
  
    // Falta agregar contraseña!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    password: yup.string()
    .required('La contraseña es requerida')
    // .matches(
    //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$",
    //   "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número"
    // ),
  // ,
  // descripcion: yup.string()
  //   .required("La descripción es requerida")
  //   .min(10, "La descripción debe tener al menos 10 caracteres")
  //   .max(500, "La descripción no debe exceder los 500 caracteres"),
})