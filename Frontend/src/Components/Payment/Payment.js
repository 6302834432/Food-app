import React, { useEffect, useState } from 'react'
import '../Payment/Payment.css'
import Title from '../Title/Title'
import Button from '../Button/Button'
import OrderItemList from '../OrderItemList/OrderItemList'
import { getorderforCurrentUser } from '../../Services/Orderservice'
import {Map} from '../Map/Map'
import PaypalButtons from '../PaypalButtons/PaypalButtons'
export default function Payment() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getorderforCurrentUser()
    .then(data =>{
      console.log(data)
      setOrder(data)})
    .catch(err=>{
      console.log(err)
    })
      
  }, []);

  if (!order) return;

  return (
    <>
      <div className='payment-container'>
        <div className='payment-content'>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className='payment-summary'>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemList order={order} />
        </div>

        <div className='payment-map'>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className='payment-buttons_container'>
          <div className='payment-buttons'>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}