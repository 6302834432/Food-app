const  express=require('express')
const router =express.Router()
const handler=require('express-async-handler');
const { BAD_REQUEST } = require('../constants/httpStatus');
const { OrderModel } = require('../Model/OrderModel');
const { OrderStatus } = require('../constants/OrderStatus');
const {authmiddleware}=require('../../src/middlewares/authmiddleware')
router.use(authmiddleware)
router.post('/create',
    handler(async(req,res)=>{
        const order=req.body;
        if(order.items.length<=0)res.status(BAD_REQUEST).send("Cart is Empty!")

            await OrderModel.deleteOne({
                user:req.user.id,
                status:OrderStatus.NEW


            })
            console.log(order)
        const newOrder =new OrderModel ({...order,user:req.user.id})
       await newOrder.save()
       res.send (newOrder)
    })



)

module.exports=router