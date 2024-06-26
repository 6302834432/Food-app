const mongoose=require('mongoose')
const {FoodModel}=require('../Model/FoodModel')
const {OrderStatus}=require('../constants/OrderStatus')
const LatLngSchema= new mongoose.Schema({
    lat :{
        type :String,
        required:true,
    },
    lng:{
        type:String,
        required:true
    }
},
{
    _id:false,
},
)
const OrderItemSchema=new mongoose.Schema({
    food:{
        type:FoodModel.schema,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},
{
_id:false
}
)
OrderItemSchema.pre('validate',function (next){
    this.price=this.food.price*this.quantity
    next()
})

const OrderSchema=new mongoose.Schema( {
    name: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
const OrderModel=mongoose.model('orders',OrderSchema)
module.exports={OrderModel}