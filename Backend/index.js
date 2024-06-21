const express=require('express')
const cors =require('cors')
const cookie=require ('cookie')
const mongoose=require  ('mongoose')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const morgan =require('morgan')
const { urlencoded } = require('body-parser')
const { dbconnect } = require('./src/config/databaseconfig')
dotenv.config()
const  app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    credintials:true,
    origin:['http://localhost:3000'],
}));
dbconnect()

//routes
app.use('/api/foods',require('./src/Routes/Food_router'))
app.use('/api/users',require('./src/Routes/UserRouter'))
app.use('/api/orders',require('./src/Routes/OrderRouter'))


app.listen(8000, (err) => {
if (err) {
console.log(err);
}
else {
console.log('Server is Running on port Number', 8000);
}
})