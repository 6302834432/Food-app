import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../Starrating/StarRating'
import Price from '../Price/Price'
import '../Item/item.css'
const Item = ({foods}) => {
  return (
  
    <ul className='item-list'>
        {
          
            foods.map(food=>(
                <li key={food.id}>
                    <Link to={`/foods/${food.id}`} style={{textDecoration:'none'}}>
                    <img className='item-img' src={`${food.imageUrl}`}alt={food.name}></img>
                    
                   
                    <div className='item-content'>
                        <div className='item-name'>
                            {food.name} 
                        </div>
                        <span className='item-favorite'>❤</span>
                        <div className='item-stars'>
                            <StarRating stars={food.stars}></StarRating>
                        </div>
                        <div className='item-footer'>
                <div className='item=origins'>
                  {food.origins.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
                <div className='item-cooktime'>
                    <span>🕒</span>
                    {food.cookTime}
                </div>
                </div>
                <div className='item=price'>
                    <Price price={food.price}/>
                </div>
                    </div>
                    </Link>
                </li>

            ))}
        
    </ul>
  )
}

export default Item