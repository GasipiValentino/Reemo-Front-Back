import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [nombre, setNombre] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [ error, setError ] = React.useState('')
    const navigate = useNavigate()
  
    const handleNombre = (e) => {
      setNombre(e.target.value)
    }
  
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault()
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
        const respuesta = await resp.json;
        setError(respuesta.mensaje)
       }

    //    const data = await resp.json()
    //    console.log(data.token);
    //    localStorage.setItem('token', data.token)
  }
  
    return (
      <div>
        <h3>Registro</h3>
          <form action="" onSubmit={ handleSubmit }>
              <label>Nombre</label>
              <input onChange={ handleNombre } type='nombre' name='nombre' id='nombre '/>
              <br />
              <label>Password</label>
              <input onChange={ handlePassword } type='password' name='pass' id='pass '/>
              <button type="submit">Crear Cuenta</button>
              <Link to="/login">Login</Link>
              { <p>{error}</p> }
          </form>
      </div>
    )
}

export default Register