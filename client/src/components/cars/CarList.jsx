import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { call } from '../../services/api.service';

const CarList = () => {
  const [autos, setAutos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los autos según la página
  const fetchAutos = async (currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3333/api/vehiculos?page=${currentPage}&limit=8`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data)
      setAutos(data.autos || []);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

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


  // Llama a la función fetchAutos cuando cambie la página
  useEffect(() => {
    fetchAutos(page);
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <div className='p-4 max-w-md mx-auto md:max-w-screen-xl'>
        <h1 className="text-3xl mb-4 sm:text-4xl font-bold text-gray-900 m-6">Autos disponibles en Reemo</h1>
        {mensajeError && <p className="text-red-500 mb-4">{mensajeError}</p>}
        <div className='flex flex-row gap-2 max-w-dvh overflow-x-auto'>
          {marcas.map((marca) => (
            <a 
              key={marca.marca} 
              href={`/marca/${marca._id}`}
              className='bg-blue-200 px-3 py-2 rounded-full flex items-center'
              >
                {marca.marca}
            </a>
          ))}
        </div>
        {/* Navegación de páginas */}
        <div className='flex gap-8 justify-center my-8'>
          {page > 1 && (
            <button 
              className='py-2 px-4 rounded-md text-white bg-green-700'
              onClick={() => setPage(page - 1)}
            >
              Página Anterior
            </button>
          )}
          <p className='py-2 px-4 rounded-md text-white bg-green-500'>{page}</p>
          {page < totalPages && (
            <button 
              className='py-2 px-4 rounded-md text-white bg-green-700'
              onClick={() => setPage(page + 1)}
            >
              Página Siguiente
            </button>
          )}
        </div> 
      </div>

      {/* Listado de autos */}
      <div className="max-w-md mx-auto md:max-w-screen-xl mb-4 grid gap-4 md:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : autos.length > 0 ? (
          autos.map((auto, index) => (
            <div 
              className="rounded-2xl shadow-md relative flex relative flex-col shadow-sm overflow-hidden hover:bg-primary-300" 
              key={index}
            >
              <figure className='flex relative align-center justify-center m-2'>
                <img
                  src={auto.img}
                  className="aspect-square w-full h-full object-cover rounded-xl overflow-hidden"
                  alt={auto.modelo}
                />
              </figure>
              <div className="flex flex-1 flex-col justify-between p-2">
                <article className='flex align-end justify-between'>
                  <h3 className="text-2xl mb-2 sm:text-xl font-bold text-gray-900">
                    {auto.modelo} {auto.marca}
                  </h3>
                </article>
                <div className='mt-4 flex flex-col items-center gap-4'>
                  <Link 
                    to={`/car/${auto._id}`} 
                    className="w-full flex justify-between items-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
              <Link
                to="/car/publish"
                className="fixed gap-4 md:flex z-50 items-center justify-center bottom-0 right-0 m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full md:rounded-lg text-md px-2 md:px-4 py-2 text-center">
                <span className="md:block">Publicar Vehículo</span>
              </Link>
            </div>
          ))
        ) : (
          <p>No hay autos para mostrar</p>
        )}
      </div>
    </div>
  );
}

export default CarList;