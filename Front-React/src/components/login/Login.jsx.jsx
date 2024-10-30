import React from 'react'
import { useState } from 'react'

// const email = []

const Login = () => {

  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')

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
     const data = await resp.json()
     console.log(data.token);
     localStorage.setItem('token', data.token)
}

  return (
    <div>
        <form action="" onSubmit={ handleSubmit }>
            <label>Nombre</label>
            <input onChange={ handleNombre } type='nombre' name='nombre' id='nombre '/>
            <br />
            <label>Password</label>
            <input onChange={ handlePassword } type='password' name='pass' id='pass '/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login