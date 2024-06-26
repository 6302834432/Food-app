import React, { useEffect, useState } from 'react'
import classes from '../OrderTrack/OrderTrack.module.css'
import { useParams } from 'react-router-dom'
import { OrderTarckById } from '../../Services/Orderservice';
import NotFound from '../../Components/NotFound/NotFound';
import Title from '../../Components/Title/Title';
import {Map} from '../../Components/Map/Map'
import DateTime from '../../Components/DateTime/DateTIme';
import { Link } from 'react-router-dom';
import OrderItemsList from '../../Components/OrderItemList/OrderItemList'
export default function OrderTrack() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      OrderTarckById(orderId).then(order => {
        setOrder(order);
      });
  }, [orderId]);

  if (!orderId)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
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
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to="/payment">Go To Payment</Link>
          </div>
        )}
      </div>
    )
  );
}