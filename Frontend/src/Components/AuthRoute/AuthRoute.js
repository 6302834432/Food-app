import React, { Children } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Hooks/UseAuthHook.js'

const AuthRoute = ({children}) => {
    const location=useLocation()
    const {user}=localStorage.getItem('user-name')
  return  user ?(
    children 
  ):(
    <Navigate to={`/login?retrunUrl=${location.pathname}`} replace={{}}/>
  )
}

export default AuthRoute