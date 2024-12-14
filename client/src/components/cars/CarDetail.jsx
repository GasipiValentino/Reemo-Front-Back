import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useToken } from '../contexts/session.context';

const CarDetail = () => {

  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/vehiculos/${id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        setAuto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  fetchCar();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!auto) return <p>Vehículo no encontrado.</p>;

  return (
    auto && <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mt-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" key={auto._id}>
        <figure>
          <img
            src={auto.img}
            className="my-auto h-16 mx-auto md:h-full"
            alt={auto.modelo}
          />
        </figure>
        <article className="mt-6 sm:mt-8 lg:mt-0">
          <h1 className="text-3xl mb-4 sm:text-4xl font-bold text-gray-900">{auto.marca} {auto.modelo}, {auto.año}</h1>
          <h2 className='text-3xl mb-3 sm:text-2xl font-bold text-gray-900'>${auto.precio} /día</h2>
          <p className="mb-3 text-gray-500 break-words">{auto.descripcion}</p>
          <div className='flex wrap gap-4'>
          <Link to="/" className="py-2 px-4 rounded-md text-white bg-green-700">
              Atrás
          </Link>
          { 
            token ? (
              <>
            <Link to={`/car/edit/${auto._id}`} className="py-2 px-4 rounded-md text-white bg-blue-700">
              Editar
            </Link>
            <Link to={`/car/delete/${auto._id}`} className="py-2 px-4 rounded-md text-white bg-red-700">
              Eliminar
            </Link>
            </>
            ) : (
              <></>
            )
          }
          </div>

        </article>
      </div>
    </div>
  )
}

export default CarDetail