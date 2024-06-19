import React, { createContext, useState } from 'react'
export const LoadContext=createContext(null)
const LoadingProvider = ({children}) => {
const [isloading,setisloading]=useState(false)
const showLoading =()=>{
    setisloading(true)
}
const hideLoading=()=>setisloading(false)
  return (
    <LoadContext.Provider value={{isloading,showLoading,hideLoading}}>
        {children}
    </LoadContext.Provider>
    
  )
}

export default LoadingProvider