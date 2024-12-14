import { createContext, useContext, useState  } from "react"
import { useNavigate } from "react-router-dom"

const SessionContext = createContext()

function useSession(){
    return useContext(SessionContext)
}

function useToken(){
    const { token } = useSession()
    return token
}

function useLogin(){
    const {onLogin} = useSession()
    return onLogin
}

function useLogout(){
    const {onLogout} = useSession()
    return onLogout
}

function SessionProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("token"))

    const navigate = useNavigate()

    const onLogin = (jwt) => {
        localStorage.setItem("token", jwt)
        setToken(jwt)
        navigate("/")
    }

    const onLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
        navigate("/login")
    }

    return(
        <SessionContext.Provider value={{ token, onLogin, onLogout }}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionContext, SessionProvider, useSession, useToken, useLogin, useLogout}