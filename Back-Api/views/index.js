function createPage(titulo, contenido) {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo}</title>
    </head>
    <body>
      <nav>
        <h1><a href="/vehiculos">Reemo</h1>
        <a href="/vehiculos">Vehiculos</a>
        <a href="/usuarios">Usuarios</a>
        <form action="/vehiculo" method="GET">
          <select name="marca" id="marca">
            <option value="" disabled selected>Todos</option>
            <option value="Toyota">Toyota</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Fiat">Fiat</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Renault">Renault</option>
            <option value="Ford">Ford</option>
            <option value="Nissan">Nissan</option>
            <option value="Honda">Honda</option>
            <option value="Jeep">Jeep</option>
          </select>
          <button type="submit">Buscar</button>
        </form>
        </nav>
      ${contenido}
    </body>
  </html>
  `;
}

function crearListado(vehiculos, filtros) { 
  let html = `  
  <form action="/vehiculos" method="GET">  
  <label for="año">Año:</label>
  <input type="number" name="año" id="año" value="${filtros.año || ''}">
    <label for="precioMenor">Precio Menor:</label>
    <input type="number" name="precioMenor" id="precioMenor" 
      value="${filtros.precioMenor ? filtros.precioMenor : ''}">
  
    <label for="precioMayor">Precio Mayor:</label>
    <input type="number" name="precioMayor" id="precioMayor" 
      value="${filtros.precioMayor ? filtros.precioMayor : ''}">
  
    <button type="submit">Filtrar</button>
  </form>
  <a href='/vehiculo/nuevo' >Nuevo Vehículo</a>
  `;

  if (vehiculos.length === 0) {
    html += `<p>No se encontraron vehículos con esas especificaciones.</p>`;
  } else {
    html += "<ul>";
    for (let i = 0; i < vehiculos.length; i++) {
      html +=
        `<li>${vehiculos[i].marca} ${vehiculos[i].modelo} - ${vehiculos[i].precio}
          <a href="/vehiculos/${vehiculos[i]._id}">Ver</a>
          <a href="/vehiculo/eliminar/${vehiculos[i]._id}">Eliminar</a>
          <a href="/vehiculo/editar/${vehiculos[i]._id}">Modificar</a>
        </li>`;
    }
    html += "</ul>";
  }

  return html;
}

function crearListadoMarca(vehiculos){
  if (vehiculos.length === 0) {
    html += `<p>No se encontraron vehículos con esas especificaciones.</p>`;
  } else {
    let html = "<ul>"
    for( let i = 0; i < vehiculos.length ; i++ ){
        html += 
          `<li>${vehiculos[i].marca} ${vehiculos[i].modelo } - ${vehiculos[i].precio}
            <a href="/vehiculos/${vehiculos[i]._id}">Ver</a>
            <a href="/vehiculo/eliminar/${vehiculos[i]._id}">Eliminar</a>
            <a href="/vehiculo/modificar/${vehiculos[i]._id}">Modificar</a>
          </li>`
    }
    html += `</ul>
    <a href="/vehiculos" >atras</a>
    
    `
    return html
  }
} 

function crearListadoUsuarios(usuarios){
  if (usuarios.length === 0) {
    html += `<p>Aún no existen usuarios.</p>`;
  } else {
    let html = "<ul>"
    for( let i = 0; i < usuarios.length ; i++ ){
        html += 
          `<li>${usuarios[i].nombre} <a href="/usuario/${usuarios[i]._id}"> Ver</a></li>`
    }
    html += "</ul>"
    return html
  }
} 

function createPaginaDetalle(vehiculo) {
  console.log(vehiculo);
  return `
  <p>ID: ${vehiculo._id}</p>
  <p>MARCA: ${vehiculo.marca}</p>
  <p>MODELO: ${vehiculo.modelo}</p>
  <p>COLOR: ${vehiculo.colores}</p>
  <p>WEB: <a href="${vehiculo.link}" target="_blank">${vehiculo.link}</a></p>
  <p>IMAGEN: ${vehiculo.img}</p>
  <p>AÑO: ${vehiculo.año}</p>
  <p>PRECIO: ${vehiculo.precio}</p>
  <p>DESCRIPCION: ${vehiculo.descripcion}</p>

  <a href="/vehiculos" >atras</a>
`;
}

function nuevoVehiculo() {
  return `
  <h1>Agregar Vehículo</h1>
  <form action="/vehiculo/nuevo" method="POST">
    <input type="text" name="marca" placeholder="Marca" required>
    <input type="text" name="modelo" placeholder="Modelo" required>

    <select name="colores" placeholder="Color" required>
      <option value="Blanco">Blanco</option>
      <option value="Negro">Negro</option>
      <option value="Gris">Gris</option>
      <option value="Rojo">Rojo</option>
      <option value="Azul">Azul</option>
      <option value="Verde">Verde</option>
    </select>

    <input type="text" name="link" placeholder="Link">
    <input type="number" name="año" placeholder="Año">
    <input type="text" name="img" placeholder="Imagen ruta">
    <input type="number" name="precio" placeholder="Precio">

    <textarea name="descripcion" placeholder="Descripción"></textarea>

    <button type="submit">Agregar</button>
  </form>
`;
}

function editarVehiculo(vehiculo) {
  return `
  <h1>Editar Vehículo</h1>

  <form action="/vehiculo/editar/${vehiculo._id}" method="POST">

    <input value="${
      vehiculo.marca
    }" type="text" name="marca" placeholder="Marca" required>
    <input value="${
      vehiculo.modelo
    }" type="text" name="modelo" placeholder="Modelo" required>

    <select name="colores" placeholder="Color" required>
      <option value="Blanco" ${
        vehiculo.colores === "Blanco" ? "selected" : ""
      }>Blanco</option>
      <option value="Negro" ${
        vehiculo.colores === "Negro" ? "selected" : ""
      }>Negro</option>
      <option value="Gris" ${
        vehiculo.colores === "Gris" ? "selected" : ""
      }>Gris</option>
      <option value="Rojo" ${
        vehiculo.colores === "Rojo" ? "selected" : ""
      }>Rojo</option>
      <option value="Azul" ${
        vehiculo.colores === "Azul" ? "selected" : ""
      }>Azul</option>
      <option value="Verde" ${
        vehiculo.colores === "Verde" ? "selected" : ""
      }>Verde</option>
    </select>

    <input value="${vehiculo.link}" type="text" name="link" placeholder="Link">
    <input value="${vehiculo.año}" type="number" name="año" placeholder="Año">
    <input value="${
      vehiculo.img
    }" type="text" name="img" placeholder="Imagen ruta">
    <input value="${
      vehiculo.precio
    }" type="number" name="precio" placeholder="Precio">

    <textarea name="descripcion" placeholder="Descripción">${
      vehiculo.descripcion
    }</textarea>

    <button type="submit">Editar</button>
  </form>
  `;
}

function createUsuarioDetalle(usuario, vehiculosDisponibles) {
  console.log(usuario);
  let html = `
  <p>ID: ${usuario._id}</p>
  <p>NOMBRE: ${usuario.nombre}</p>
  <p>IMAGEN: ${usuario.img}</p>
  <p>DESCRIPCION: ${usuario.descripcion}</p>
  <p>HISTORIAL:</p>`
  if (usuario.historial.length === 0) {
    html += `<p>Este usuario no ha reservado ningún vehículo aún.</p>`;
  } else {
    html += "<ul>";
    for (let i = 0; i < usuario.historial.length; i++) {
      html +=
        `<li>${usuario.historial[i].marca} ${usuario.historial[i].modelo} - ${usuario.historial[i].precio}
          <a href="/vehiculos/${usuario.historial[i]._id}">Ver</a>
        </li>`;
    }
    html += `</ul>`
    html += `<a href="/usuarios">Atrás</a>`;
    }
    html += `<h3>Autos disponibles</h3>`;

    if (vehiculosDisponibles.length === 0) {
      html += `<p>No hay vehículos disponibles actualmente.</p>`;
    } else {
      html += "<ul>";
      for (let i = 0; i < vehiculosDisponibles.length; i++) {
        html += `
          <li>
          <form action="/usuario/${usuario._id}/historial" method="POST">
              <input value="${vehiculosDisponibles[i]._id}" name="_id" id="historial" type="hidden">
              <label for="historial">${vehiculosDisponibles[i].marca} ${vehiculosDisponibles[i].modelo} - ${vehiculosDisponibles[i].precio}</label>
              <button type="submit">Reservar</button>
            </form>
          </li>`;
      }
      html += "</ul>";
    }

  return html;
}

export default {
  createPage,
  crearListado,
  createPaginaDetalle,
  nuevoVehiculo,
  editarVehiculo,
  crearListadoMarca,
  crearListadoUsuarios,
  createUsuarioDetalle
};
export {
  createPage,
  crearListado,
  createPaginaDetalle,
  nuevoVehiculo,
  editarVehiculo,
  crearListadoMarca,
  crearListadoUsuarios,
  createUsuarioDetalle
};





