import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { call } from '../../services/api.service';

const CarEdit = () => {
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
  const { _id } = useParams();

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

  useEffect(() => {
    async function fetchVehiculo() {
      try {
        const data = await call({ uri: `vehiculos/${_id}` });
        setVehiculo(data);
      } catch (error) {
        console.error(error);
        setMensajeError('No se pudo cargar los datos del vehículo');
      }
    }
    fetchVehiculo();
  }, [_id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', vehiculo);
    const { _id, ...vehiculoSinId } = vehiculo;
    try {
      await call({ uri: `vehiculo/${_id}`, method: 'PATCH', body: vehiculoSinId });
      navigate(`/car/${_id}`);
    } catch (error) {
      console.error(error);
      setMensajeError('No se pudo actualizar el vehículo');
    }
  };
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Vehículo</h1>
      {mensajeError && <p className="text-red-500 mb-4">{mensajeError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className='block text-sm font-medium'>Marca</label>
          <select 
            name="marca" 
            value={vehiculo.marca}
            onChange={handleChange}
            className='border p-2 w-full'
            required
            >
              <option value="">Seleccione una marca</option>
              {marcas.map((marca) => (
                <option key={marca._id} value={marca.marca}>{marca.marca}</option>
              ))}
            </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Modelo</label>
          <input
            type="text"
            name="modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Colores</label>
          <input
            type="text"
            name="colores"
            value={vehiculo.colores}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Imagen (URL)</label>
          <input
            type="text"
            name="img"
            value={vehiculo.img}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Enlace</label>
          <input
            type="text"
            name="link"
            value={vehiculo.link}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Año</label>
          <input
            type="number"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="precio"
            value={vehiculo.precio}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={vehiculo.descripcion}
            onChange={handleChange}
            className="border p-2 w-full"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 me-4">
          Guardar Cambios
        </button>
        <Link
                to={`/car/${vehiculo._id}`}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
              >
                Cancelar
              </Link>
      </form>
    </div>
  );
};

export default CarEdit;
