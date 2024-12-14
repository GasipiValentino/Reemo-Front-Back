import { Navigate } from "react-router-dom"

const ProtectedRouter = ({component}) => {
    const token = localStorage.getItem("token")
    if(token){
        return component
    }else{
        return <Navigate to="/login"></Navigate>
    }
}

export default ProtectedRouter