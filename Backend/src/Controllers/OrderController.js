const { OrderModel } = require('../Model/OrderModel');
const {UserModel}=require('../Model/Usermodel');
const { OrderStatus } = require('../constants/OrderStatus');

const getByStatusController=async (req,res)=>{
    const status=req.params.status;
    const user =await UserModel.findById(req.user.id)
    const filter={}
    if(!user.isAdmin) filter.user=user._id
    if (status)filter.status=status
    const orders=await OrderModel.find(filter).sort('~createdAt')
    return res.send(orders)
}
const HandleOrderStatus=async ()=>{
    try {
        const allStatus = await Object.values(OrderStatus);
          return res.send(allStatus);
       } catch (error) {
        console.log(error)
       }
}
module.exports={getByStatusController,HandleOrderStatus}