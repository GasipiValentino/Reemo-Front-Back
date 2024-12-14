import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/auth.service'

const Register = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [ error, setError ] = React.useState('')
    const navigate = useNavigate()
  
    const handleEmail = (e) => {
      setEmail(e.target.value)
    }
  
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        await register(email, password)
        navigate('/')
      } catch (error) {
        setError(error.message)
      }
/*       e.preventDefault()
      const resp = await  fetch('http://localhost:3333/api/usuarios', { 
        method: 'POST',
        body: JSON.stringify({ nombre: nombre, password: password }),
        headers: {
          'Content-Type': 'application/json',
        }
       })
       if( resp.ok ){
        navigate("/login")
       } else{
         const respuesta = await resp.json();
         setError(respuesta.mensaje)
        } */
        
        //  const data = await resp.json()
        //  console.log(data.token);
        //    localStorage.setItem('token', data.token)
      }
      
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit}
        className="p-6 shadow-lg rounded-lg bg-white"
        style={{ width: '350px' }}
        >
      { error && <p className='text-red-300 mb-4 text-center'>{ error }</p> }
        <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">Crear Cuenta</h3>

        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
            <input
                onChange={handleEmail}
                type="text"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Ingresa tu email"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="pass" className="block text-gray-700 font-medium mb-1">Contraseña</label>
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
            Crear Cuenta
        </button>

        <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">Iniciar Sesión</Link>
        </div>
    </form>
</div>

    )
}

export default Register