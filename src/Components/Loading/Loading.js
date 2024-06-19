import React from 'react'
import '../Loading/Loading.css'
import loadingsvg from '../../images/icons/loading.svg'
import { useContext } from 'react'
import { LoadContext } from '../../Hooks/LoadingHook'

const Loading = () => {
  const {isloading}=useContext(LoadContext)
  if(!isloading) return;

  return (
    <div className='loading-container'> 
        <div className='loading-items'>
          <img src={loadingsvg} alt='Loading !'/>
          <h1>Loading...</h1>
        </div>
    </div>
  )
}

export default Loading