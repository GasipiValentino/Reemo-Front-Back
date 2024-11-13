import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/login/Login.jsx"
import Register from './components/login/Register.jsx'
import Home from './pages/Home.jsx'
import ProtectedRouter from './components/router/ProtectedRouter.jsx'
import Layout from './components/Layout/Layout.jsx'
import Logout from './components/login/Logout.jsx'

import { SessionProvider } from './components/contexts/session.context.jsx'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [{
    element: <Login/>,
    path: "/login"
  },
  {
    element: <Register/>,
    path: "/register"
  },
  {
    element: <Logout/>,
    path: "/logout"
  },
  {
    element: <ProtectedRouter component={<Home/>}/>,
    path: "/"
  }
]},
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
