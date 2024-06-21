import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Hooks/UseAuthHook.js'
import { CartContext } from '../../Hooks/CartHook.js'
import { set, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createorder } from '../../Services/Orderservice.js'
import Title from '../../Components/Title/Title.js'
import Input from '../../Components/Input/Input.js'
import {Button} from '../../Components/Button/Button.js'
import '../Checkout/CheckOut.css'
import OrderItemList from '../../Components/OrderItemList/OrderItemList.js'
import { Map } from '../../Components/Map/Map.js'
const Checkoutpage = () => {
  
  const location = useLocation()
  const { cart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [order, setOrder ] = useState({...cart })
  const { register, formState: { errors }, handleSubmit, } = useForm()
  const submit = async data => {
    if (!order.addressLatLng) {
      toast.warning('Please select your loaction on to the map')
      return;
    }
    {console.log(order)}
    await createorder({ ...order, name: data.name, address: data.address })
    navigate('/payment')
  }
  return (
    <>
      <form

       onSubmit={ handleSubmit(submit)}
       className='checkout-container'>
        <div className='checkout-content'>
          <Title title="Order Form" fontsize="1.6rem"/>
          <div className='checkout-inputs'>
            <Input
            defaultValue={user.name}
            label="Name"{
              ...register('name')
            }
            error={errors.name}/>
             <Input
            defaultValue={user.address}
            label="Address"{
              ...register('Address')
            }
            error={errors.address}/>
          </div>
       
          <OrderItemList order={order}/>
        </div>
        <div><Title title="Choose Your Loaction" fontsize='1.6rem'/>
        <Map  location={order.addressLatLng}
        onChange={latlang=>{
          console.log(latlang)
          setOrder({...order,addressLatLng:latlang})
        }}/>
        </div>
        <div className='checkout-buttons_container'>
          <div className='checkout-buttons'>
            <Button type="submit"
            text="Go To Payment"
            width='100%'
            height="3rem"/>
          </div>
        </div>
       </form>
    </>
  )
}

export default Checkoutpage