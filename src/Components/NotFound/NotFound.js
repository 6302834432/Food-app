import React from 'react'
import '../NotFound/NotFound.css'
import { Link } from 'react-router-dom'
const NotFound = ({message,linkRoute,LinkText}) => {
  return (
   <div className='notfound-container'>
    {message}
    <Link to={linkRoute} style={{textDecoration:'none'}}>{LinkText}</Link>
   </div>
    
  )
}
NotFound.defaultProps={
  message:'Nothing Found!',
  linkRoute:'/',
  LinkText:'Go To Home Page'
}
export default NotFound