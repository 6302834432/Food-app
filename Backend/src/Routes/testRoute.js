const express=require('express');
const { OrderStatus } = require('../constants/OrderStatus');
const { HandleOrderTracker } = require('../Controllers/OrderController');
const router =express.Router()
router.get('/allstatus', async (req, res) => {
    try {
     const allStatus = await Object.values(OrderStatus);
       console.log(allStatus)
       return res.send(allStatus);
    } catch (error) {
     console.log(error)
    }
   });
module.exports=router