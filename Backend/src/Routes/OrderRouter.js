const  express=require('express')
const router =express.Router()
const handler=require('express-async-handler');
const { BAD_REQUEST } = require('../constants/httpStatus');
const { OrderModel } = require('../Model/OrderModel');
const { OrderStatus } = require('../constants/OrderStatus');
const {authmiddleware}=require('../../src/middlewares/authmiddleware');
router.use(authmiddleware)
router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;
    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');
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
      const order = await OrderModel.findOne({user:req.user.id,status:OrderStatus.NEW})
      if (!order) {
        res.status(BAD_REQUEST).send('Order Not Found!');
        return;
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

      if (order) res.send(order);
      else res.status(BAD_REQUEST).send();
    })
  );
  module.exports=router