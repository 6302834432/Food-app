// import React from 'react'
import axios from 'axios'

export const createorder = async order  => {

    try {
        const data=axios.post('http://localhost:8000/api/orders/create',order)
        return data
        
    } catch (error) {
        
    }
}
export const getorderforCurrentUser=async()=>{
    try {
        const {data} =await axios.get('http://localhost:8000/api/orders/newOrderForCurrentUser')
        console.log('data',data)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const pay =async(paymentId)=>{
    try {
        const {data}=await axios.put('http://localhost:8000/api/orders/pay',{paymentId})
        return data;
        
    } catch (error) {
        
    }
}
