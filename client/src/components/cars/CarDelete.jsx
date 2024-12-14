import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToken } from '../contexts/session.context';
import { call } from '../../services/api.service';

const CarDelete = () => {
  const [error, setError] = useState('');
  const [vehiculo, setVehiculo] = useState({
    marca: '',
    modelo: '',
    img: '',
    año: '',
  });
  const navigate = useNavigate();
  const token = useToken();
  const { _id } = useParams(); 

  useEffect(() => {
    console.log('ID del vehículo:', _id);
  
    if (_id) {
      const fetchVehiculo = async () => {
        try {
          const data = await call({
            uri: `vehiculos/${_id}`,
            method: 'GET',
          });
          setVehiculo(data);
        } catch (error) {
          setError('No se pudo obtener los datos del vehículo');
        }
      };
  
      fetchVehiculo();
    } else {
      setError('ID del vehículo no encontrado');
    }
  }, [_id]);
  

  const handleDelete = async (id) => {
    try {
      const response = await call({
        uri: `vehiculo/${id}`,
        method: 'PATCH',
        body: { eliminado: true },
      });
  
      navigate('/');
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el vehículo');
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8">
      {token ? (
        <>
          <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">
            ¿Estás seguro de que quieres eliminar este vehículo?
          </h3>

          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <div className="mb-4">
              {vehiculo.img && <img src={vehiculo.img} alt={vehiculo.marca} className="w-full h-auto rounded mt-4" />}
              <p className="text-xl text-gray-800">Marca: {vehiculo.marca}</p>
              <p className="text-xl text-gray-800">Modelo: {vehiculo.modelo}</p>
              <p className="text-xl text-gray-800">Año: {vehiculo.año}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(vehiculo._id)}
                className="py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
              >
                Eliminar Vehículo
              </button>
              <Link
                to={`/car/${vehiculo._id}`}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
              >
                Cancelar
              </Link>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </>
      ) : (
        <h3 className="text-center text-2xl font-semibold text-blue-600">
          Debes iniciar sesión para eliminar un vehículo
        </h3>
      )}
    </div>
  );
};

export default CarDelete;
