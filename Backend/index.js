const express=require('express')
const cors =require('cors')
const cookie=require ('cookie')
const mongoose=require  ('mongoose')
const jwt=require('jsonwebtoken')
const morgan =require('morgan')
const { urlencoded } = require('body-parser')
const { ConnectToDb } = require('./src/Model/DbConnection')
const  app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    credintials:true,
    origin:['http://localhost:3000'],
}));
ConnectToDb()

//routes
app.use('/api/foods',require('./src/Routes/Food_router'))
app.use('/api/users',require('./src/Routes/UserRouter'))


app.listen(8000, (err) => {
if (err) {
console.log(err);
}
else {
console.log('Server is Running on port Number', 8000);
}
})