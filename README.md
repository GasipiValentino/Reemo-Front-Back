# Reemo - API de Vehículos

Este proyecto es una **API para registrar vehículos** de distintas marcas, diseñada específicamente para integrarse en la plataforma de alquiler de vehículos **Reemo**. 

## Acerca del Proyecto

Reemo es una plataforma de alquiler de vehículos que permite a los usuarios alquilar o poner en alquiler sus propios vehículos. Esta API cumple una función clave al momento de registrar los vehículos, ya que:

- Solo es posible registrar vehículos que existan en esta API, asegurando un control estricto sobre las marcas y modelos disponibles.
- Proporciona información técnica detallada del vehículo, evitando que los usuarios deban completar datos específicos, mejorando así la experiencia del usuario.

## Características Principales

- **Gestión de vehículos:** Registro de autos basados en información validada.
- **Información técnica:** Datos precisos y predefinidos para facilitar el registro.
- **Integración con Reemo:** El sistema se conecta directamente con la plataforma final de alquiler de vehículos.

---

## Tecnologías Utilizadas

El proyecto se desarrolló utilizando las siguientes tecnologías:

- **Node.js** y **Express**: Para la creación de la API.
- **MongoDB**: Como base de datos para almacenar la información de los vehículos.
- **React**: Para el cliente web que interactúa con la API.

---

## Cómo Usar este Proyecto

Sigue los pasos a continuación para configurar y ejecutar el proyecto:

### Requisitos Previos

1. Tener instalado **Node.js** y **npm**.
2. Tener acceso a una base de datos MongoDB (puede ser local o en la nube).

### Instalación

1. Clona el repositorio del proyecto.
2. Ve a las carpetas `server` y `client` por separado y ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
### Ejecución

1. Arranca el servidor desde la carpeta `server`:

   ```bash
   npm run dev
   
2. Arranca el cliente desde la carpeta `client`:

   ```bash
   npm run dev

3. Asegúrate de que ambas aplicaciones estén corriendo correctamente y verifica la conexión con la base de datos.

---

## Contribuidores
Este proyecto fue desarrollado por:

- **Lucas Panadero**
- **Valentino Gassipi**
- **Yoel Lazarte**