import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/session.context'
import { login as loginService } from '../../services/auth.service'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ error, setError ] = useState('')
  
  const navigate = useNavigate()
  const login = useLogin()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null);

    try {
      const usuario = await loginService(email, password);
      if (usuario?.token) {
        login(usuario.token);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError(error.message)
    }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit}
        className="p-6 shadow-lg rounded-lg bg-white"
        style={{ width: '350px' }}
        >
      { error && <p className='text-red-300 mb-4 text-center'>{ error }</p> }
        <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">Login</h3>

        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Correo Electrónico</label>
            <input
                onChange={handleEmail}
                value={email}
                type="text"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Ingresa tu email"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="pass" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
                onChange={handlePassword}
                value={password}
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