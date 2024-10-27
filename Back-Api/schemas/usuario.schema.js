import yup from "yup"

export const usuarioSchema = yup.object({
    nombre: yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  
  img: yup.mixed()
    .required("La imagen es requerida")
    .test("fileFormat", "El formato no es válido, solo se aceptan JPG o PNG", (value) => {
      if (!value) return false;
      const acceptedFormats = ["image/jpeg", "image/png"];
      return acceptedFormats.includes(value.type);
    }),

  descripcion: yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no debe exceder los 500 caracteres"),
})


// nombre
// "Niño Eze"
// img
// "https://fastly.picsum.photos/id/599/200/300.jpg?hmac=E2gUK85wncj5qALDL…"
// descripcion
// "Niño Eze es un nenazo muy bueno"