import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// const email = []

const Login = () => {

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleNombre = (e) => {
    setNombre(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const resp = await  fetch('http://localhost:3333/api/usuario/login', { 
      method: 'POST',
      body: JSON.stringify({ nombre: nombre, password: password }),
      headers: {
        'Content-Type': 'application/json',
      }
     })
     
     if(resp.ok){
      const data = await resp.json()
      localStorage.setItem('token', data.token)
      navigate("/")
     }



     console.log(data.token);
     localStorage.setItem('token', data.token)
}

  return (
    <div>
        <h3>Login</h3>
        <form action="" onSubmit={ handleSubmit }>
            <label>Nombre</label>
            <input onChange={ handleNombre } type='nombre' name='nombre' id='nombre '/>
            <br />
            <label>Password</label>
            <input onChange={ handlePassword } type='password' name='pass' id='pass '/>
            <button type="submit">Login</button>
            <Link to="/register">Registro</Link>
        </form>
    </div>
  )
}

export default Login