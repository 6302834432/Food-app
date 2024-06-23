import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderTarckById } from '../../Services/Orderservice'
import NotFound from '../../Components/NotFound/NotFound'
import DateTime from '../../Components/DateTime/DateTIme'
import OrderItemsList from '../../Components/OrderItemList/OrderItemList'
const OrderTrack = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState()
  useEffect(() => {
    orderId && OrderTarckById(orderId).then(data => setOrder(data))
  })
  if (!orderId) return <NotFound message='Order Not Found' LinkText='Go To Home Page' />
  return (
    order &&
    <div className='container'>
      <div className='content'>
        <h1>Order #{order.id}</h1>
        <div className='header'>
          <div>
            <strong>Date</strong>

            <DateTime date={order.createdAt} />
          </div>
          <div>
            <strong>Name</strong>
            {order.name}
          </div>
          <div>
            <strong>Address</strong>
            {order.address}
          </div>
          <div>
            <strong>State</strong>
            {order.status}
          </div>
          {
            order.paymentId && (
              <div>
                <strong>
                  Payment Id
                </strong>{order.paymentId}
              </div>

            )
          }
        </div>
        <OrderItemsList  order={order}/>
      </div>


    </div>
  )
}

export default OrderTrack