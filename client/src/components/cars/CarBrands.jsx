import { useEffect, useState } from "react";
import { Link ,useParams, useNavigate } from "react-router-dom";
import { call } from "../../services/api.service"; 

function CarBrands() {
  const { id } = useParams(); 
  const [marca, setMarca] = useState(null); 
  const [modelos, setModelos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [brands, setBrands] = useState([]); 
  const [modelsPerPage] = useState(5); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await call({ uri: "marcas" }); 
        if (data) {
          setBrands(data); 
        }
      } catch (err) {
        console.error("Error al cargar las marcas:", err);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const uri = id === undefined 
          ? `autos?page=${page}&limit=${modelsPerPage}`  // Ruta principal
          : `marca/${id}?page=${page}&limit=${modelsPerPage}`;
  
        const data = await call({ uri });
        if (!data) throw new Error("No se encontraron autos.");
  
        setMarca(id === undefined ? { marca: "todas las marcas" } : data); 
        setModelos(data.modelos); 
        setTotalPages(data.totalPages); 
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("No se pudieron cargar los autos.");
        setLoading(false);
      }
    };
  
    fetchAutos();
  }, [id, page]);
  
  

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleBrandClick = (brandId) => {
    const route = brandId === "principal" ? "/" : `/marca/${brandId}`;
    navigate(route);
  };
  
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!marca) {
    return <div>No se encontró la marca.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <div className='p-4 max-w-md mx-auto md:max-w-screen-xl'>
        <h1 className="text-3xl mb-4 sm:text-4xl font-bold text-gray-900 m-6">Modelos de {marca.marca}</h1>

        {/* Botones para cambiar de marca */}
        <div className='flex flex-wrap flex-row gap-2 max-w-dvh'>
          <button 
            onClick={() => handleBrandClick("principal")}
            className='bg-blue-500 px-3 py-2 rounded-full text-white'>
            Todas
          </button>

          {brands.map((brand) => (
            <button 
              key={brand._id} 
              onClick={() => handleBrandClick(brand._id)}
              className='bg-blue-200 px-3 py-2 rounded-full flex items-center'>
              {brand.marca}
            </button>
          ))}
        </div>



          {/* Paginación */}
          <div className='flex gap-8 justify-center my-8'>
            <button className='py-2 px-4 rounded-md text-white bg-green-700' disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Anterior</button>
            <span className='py-2 px-4 rounded-md text-white bg-green-500'>{page}</span>
            <button className='py-2 px-4 rounded-md text-white bg-green-700' disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Siguiente</button>
          </div>
        </div>

        {/* Modelos de la marca */}
          {modelos.length === 0 ? (
            <p>No hay modelos disponibles para esta marca.</p>
          ) : (
            <div className="max-w-md mx-auto md:max-w-screen-xl mb-4 grid gap-4 md:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {modelos.map((modelo) => (
                <div 
                  className="rounded-2xl shadow-md relative flex relative flex-col shadow-sm overflow-hidden hover:bg-primary-300" 
                  key={modelo._id}>
                    <figure className='flex relative align-center justify-center m-2'>
                      <img 
                        src={modelo.img} 
                        alt={modelo.modelo} 
                        className="aspect-square w-full h-full object-cover rounded-xl overflow-hidden" />
                    </figure>
                    <div className="flex flex-1 flex-col justify-between p-2">
                      <article className='flex align-end justify-between'>
                        <h3 className="text-2xl mb-2 sm:text-xl font-bold text-gray-900">
                          { modelo.marca } {modelo.modelo}
                        </h3>
                      </article>
                      <div className='mt-4 flex flex-col items-center gap-4'>
                        <Link 
                          to={`/car/${modelo._id}`} 
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
              ))}
            </div>
          )}
    </div>
  );
}

export default CarBrands;