import { useEffect, useNavigate } from 'react'

const Home = () => {

    const navigate = useNavigate()
  
    useEffect( async() => {
        fetch('http://localhost:3333/api/vehiculos',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            }
        })
        if( Response.ok ){
            const datos = await Response.json()
            console.log(datos)
        }else{
            navigate("/login")
        }
    } )

    return (
    <div>Home</div>
  )
}

export default Home