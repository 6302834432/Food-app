import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import FoodPage from './Pages/FoodPage/FoodPage'
import Cart from './Components/Cart/Cart'
import AuthRoute from './Components/AuthRoute/AuthRoute'
import Checkoutpage from './Pages/Checkout/Checkoutpage'
import Signup from './Pages/Signup/Signup'
import Payment from './Components/Payment/Payment'
function AppRoutes() {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:searchTerm' element={<Home />} />
      <Route path="/tag/:tag" element={<Home />} />
      <Route path='/foods/:id' element={<FoodPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/checkout' element={<AuthRoute><Checkoutpage /></AuthRoute>} />
      <Route path='/payment' element={<AuthRoute><Payment/></AuthRoute>} />
    </Routes>
  )
}

export default AppRoutes