import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from '../contexts/session.context';

const Close = () => {
  const token = useToken();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8">
      {token ? (
        <>
          <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">
            ¿Querés cerrar sesión?
          </h3>
          <Link
            to="/logout"
            className="w-full max-w-xs py-2 px-4 mb-4 bg-blue-600 text-white text-center font-medium rounded hover:bg-blue-700 transition duration-200"
          >
            Cerrar Sesión
          </Link>
          <Link
            to="/"
            className="w-full max-w-xs py-2 px-4 bg-blue-600 text-white text-center font-medium rounded hover:bg-blue-700 transition duration-200"
          >
            Volver
          </Link>
        </>
      ) : (
        <h3 className="text-center text-2xl font-semibold text-blue-600">
          Debés tener la sesión iniciada
        </h3>
      )}
    </div>
  );
};

export default Close;
