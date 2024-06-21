import React, {  useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../Hooks/UseAuthHook.js'

const AuthRoute = ({children}) => {
    const location=useLocation()
    const {user}=useContext(AuthContext)
  return  user ?(
    children 
  ):(
    <Navigate to={`/login?retrunUrl=${location.pathname}`} replace/>
  )
}

export default AuthRoute