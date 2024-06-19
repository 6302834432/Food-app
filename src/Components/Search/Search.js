import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Search/Search.css'

const Search = () => {
    const {searchTerm}=useParams();
    const navigation =useNavigate()
    const [Term ,setTerm]=useState('')
    useEffect(()=>{
      setTerm(searchTerm??'');

    },[searchTerm])
    const search =async ()=>{
        Term?navigation('/search/'+Term):navigation('/')
    }
  return (
    <div className='search-container'>
        <input type='text'
        onChange={e=>setTerm(e.target.value)}
        onKeyUp={e=>e.key==='Enter' && search()}
        value={Term}
        placeholder='Search Here....'
        />  
        <button className='search-button' onClick={search}> Search</button>
    </div>
  )
}

export default Search