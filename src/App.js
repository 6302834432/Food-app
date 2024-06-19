import React, { useContext, useEffect } from "react";
import Header from "./Components/Header/Header";
import AppRoutes from "./AppRoutes";
import {setLoadingInterceptor} from "./Interceptor/Loadinginterceptor";
import { LoadContext } from "./Hooks/LoadingHook";
import Loading from "./Components/Loading/Loading";

const App = () => {
  const {showLoading,hideLoading}=useContext(LoadContext)
  useEffect(()=>{
    setLoadingInterceptor({showLoading,hideLoading})
  },[])
  return (
    <div>
      <Loading/>
        <Header />
      <AppRoutes/>
      

    </div>
  )
}
export default App;