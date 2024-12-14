import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { call } from '../../services/api.service';

const CarCreate = () => {
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState({
    marca: '',
    modelo: '',
    colores: '',
    img: '',
    link: '',
    año: '',
    precio: '',
    descripcion: '',
  });
  
  const [marcas, setMarcas] = useState([]);

  const [mensajeError, setMensajeError] = useState('');

  useEffect(() =>  {
    const fetchMarcas = async () => {
      try {
        const response = await call({ uri: 'marcas', method: 'GET'});
        setMarcas(response);
      } catch (error) {
          console.error(error);
          setMensajeError('No se pudieron cargas las marcas');
      }
    };

    fetchMarcas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', vehiculo);
    try {
      const response = await call({ uri: `vehiculos`, method: 'POST', body: vehiculo });
      navigate(`/car/${response._id}`); // Redirige a la página del vehículo recién creado
    } catch (error) {
      console.error(error);
      setMensajeError(error.message);
    }
  };

  return (
    <div className="container m-4">
      <h1 className="text-2xl font-bold mb-4">Crear un nuevo vehículo</h1>
      {mensajeError && <p className="text-red-500 mb-4">{mensajeError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700">Marca:</label>
            <select
              name="marca"
              value={vehiculo.marca}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              >
              <option value="" disabled>Seleccione una marca</option>
              {marcas.map((marca) => (
                <option key={marca._id} value={marca.marca}>{marca.marca}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Modelo:</label>
            <input
              type="text"
              name="modelo"
              value={vehiculo.modelo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            />
          </div>
          <div>
            <label className="block text-gray-700">Colores:</label>
            <input
              type="text"
              name="colores"
              value={vehiculo.colores}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            />
          </div>
          <div>
            <label className="block text-gray-700">URL de la imagen:</label>
            <input
              type="text"
              name="img"
              value={vehiculo.img}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            />
          </div>
          <div>
            <label className="block text-gray-700">Enlace relacionado:</label>
            <input
              type="text"
              name="link"
              value={vehiculo.link}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Año:</label>
            <input
              type="number"
              name="año"
              value={vehiculo.año}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            />
          </div>
          <div>
            <label className="block text-gray-700">Precio:</label>
            <input
              type="number"
              name="precio"
              value={vehiculo.precio}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            />
          </div>
          <div>
            <label className="block text-gray-700">Descripción:</label>
            <textarea
              name="descripcion"
              value={vehiculo.descripcion}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              
            ></textarea>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Crear
          </button>
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CarCreate;
