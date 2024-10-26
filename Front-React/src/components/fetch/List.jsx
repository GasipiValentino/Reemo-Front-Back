import { useState,useEffect } from 'react'


const List = () => {

    const [ listado, setListado ] = useState([])
    const [ page, setPage ] = useState(1)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // const getDatos = async (uri) => {
    //     try {
    //         const response = await fetch(uri)
    //         const api = await response.json()
    //         setListado(api.results)
    //     } catch (error) {
    //         console.error(error);
    //         setError("Error de fetch de datos")
    //     } finally {
    //       setLoading(false);
    //     }
    // }

    useEffect( () => {
    //   setLoading(true);
    //   const url = searchTerm ?
    //   `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page` :
    //   `https://rickandmortyapi.com/api/character/?page=${page}`;
    //     getDatos(url);
    // }, [page, searchTerm] );
      fetch("http://localhost:3333/api/vehiculos")
        .then( (resp) => resp.json )
        .then( (datos) => console.log(datos) )
    }, [] );

    // Cambiar el término de búsqueda
    // const handleSearchChange = (e) => {
    //   setSearchTerm(e.target.value);
    //   setPage(1);
    // };



    return (
      <div>
        {/* Input de búsqueda */}
        {/* <div className='flex flex-col justify-center my-4'>
          <img 
            className='w-1/4 m-auto'
            src="./Rick_and_Morty_logo.webp" 
            alt="Logo de Ricardo y Morticio" />
          <input 
            type="text" 
            placeholder='Buscar personaje'
            value={searchTerm}
            // onChange={handleSearchChange}
            className='w-2/4	m-auto p-2 border border-gray-400 rounded'
          />
        </div> */}

        {/* Navegación de páginas */}
        {/* <div className='flex gap-8 justify-center my-8'>
          {page > 1 && (
            <button 
              className='py-2 px-4 rounded-md text-white bg-green-700'
              onClick={() => setPage(page - 1)}
            >Página Anterior</button>
          )}
          <p className='py-2 px-4 rounded-md text-white bg-green-500'>{page}</p>
          <button 
            className='py-2 px-4 rounded-md text-white bg-green-700'
            onClick={() => setPage(page + 1)}
          >Página Siguiente</button>
        </div>  */}

        {/* Mostrar listado */}
        {/* <div  className='w-9/12	m-auto my-2 flex flex-row flex-wrap gap-4'>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : listado.length > 0 ? (
            listado.map((personaje, indice) => (
              <li key={indice} className='list-none bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
                <img
                  src={personaje.image} 
                  alt={personaje.name} 
                />
                <div className='flex flex-col p-2'>
                  <h5 className='w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words whitespace-normal text-wrap'>
                    {personaje.name}
                  </h5>
                  <h6 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words whitespace-normal'>
                  {personaje.status}
                  </h6>
                  <p className='font-normal text-gray-700 dark:text-gray-400 break-words'>
                    {personaje.species} - {personaje.gender}
                  </p>
                  <p className='max-w-full truncate text-gray-700 dark:text-gray-400'>
                    {personaje.origin.name}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No hay personajes para mostrar</p>
          )}
        </div> */}
      </div>
    )
}

export default List