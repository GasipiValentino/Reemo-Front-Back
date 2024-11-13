import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin, useSession } from '../contexts/session.context'
import { login as loginService } from '../../services/auth.service'


const Login = () => {

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()

  const navigate = useNavigate()

  const handleNombre = (e) => {
    setNombre(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    loginService(nombre, password)
      .then( usuario => {
        login( usuario.token )
      } )
      .catch( (err) => console.error(err) )
    // const resp = await  fetch('http://localhost:3333/api/usuario/login', { 
    //   method: 'POST',
    //   body: JSON.stringify({ nombre: nombre, password: password }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    //  })
     
    //  if(resp.ok){
    //   const data = await resp.json()
    //   console.log(data.token)
    //   localStorage.setItem('token', data.token)
    //   setToken(data.token)
    //   onLogin()
      
    //   navigate("/")
    //  }

}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit}
        className="p-6 shadow-lg rounded-lg bg-white"
        style={{ width: '350px' }}
    >
        <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">Login</h3>

        <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
                onChange={handleNombre}
                type="text"
                name="nombre"
                id="nombre"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Ingresa tu nombre"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="pass" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
                onChange={handlePassword}
                type="password"
                name="pass"
                id="pass"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Ingresa tu contraseña"
                required
            />
        </div>
        
        <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
        >
            Login
        </button>

        <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">Registro</Link>
        </div>
    </form>
</div>

  )
}

export default Login