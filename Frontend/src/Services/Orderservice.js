// import React from 'react'
import axios from 'axios'

export const createorder = async order  => {

    try {
        const data=axios.post('http://localhost:8000/api/orders/create',order)
        return data
        
    } catch (error) {
        
    }
}
