const mongoose=require('mongoose')
const url="mongodb://127.0.0.1:27017/Food_app"
const ConnectToDb=async ()=>{
    mongoose.connect(url).then(()=>{
        console.log("Connected To Db")
    }).catch(err=>console.log(err))
}
module.exports={ConnectToDb}