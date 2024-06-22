import React, { useContext, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { LoadContext } from '../../Hooks/LoadingHook';
import { pay } from '../../Services/Orderservice';
import { CartContext } from '../../Hooks/CartHook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PayPalButtonsWrapper({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: 'AeLjSmwKIKmlXTXTeTVyuwGaAasSBFd9IGz5jTvi-IzP9KauN7if2LfhzXDzHheFeAjpMEGTFePXxdmw',
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useContext(LoadContext);

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isPending, showLoading, hideLoading]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success('Payment Saved Successfully');
      navigate('/track/' + orderId);
    } catch (error) {
      toast.error('Payment Save Failed');
    }
  };

  const onError = (err) => {
    toast.error('Payment Failed');
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
