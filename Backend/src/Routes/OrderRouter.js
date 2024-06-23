const express = require('express');
const router = express.Router();
const handler = require('express-async-handler');
const { BAD_REQUEST, UNAUTHORIZED } = require('../constants/httpStatus');
const { OrderModel } = require('../Model/OrderModel');
const { OrderStatus } = require('../constants/OrderStatus');
const { authmiddleware } = require('../../src/middlewares/authmiddleware');
const { UserModel } = require('../Model/Usermodel');

router.use(authmiddleware);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;
    if (order.items.length <= 0) return res.status(BAD_REQUEST).send('Cart Is Empty!'); // Use return here
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
    if (!order) {
      return res.status(BAD_REQUEST).send('Order Not Found!'); // Use return here
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });

    if (order) return res.send(order); // Use return here
    else return res.status(BAD_REQUEST).send(); // Use return here
  })
);

router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);
    console.log(orderId)

    if (!order) return res.status(UNAUTHORIZED).send(); // Use return here

    return res.send(order);
  })
);

module.exports = router;
