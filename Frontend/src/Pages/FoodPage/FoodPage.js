import React, { useContext, useEffect, useState } from 'react'
import '../FoodPage/Foodpage.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getById } from '../../Services/Foodservice'
import StarRating from '../../Components/Starrating/StarRating'
import Tags from '../../Components/Tags/Tags'
import Price from '../../Components/Price/Price'
import { CartContext } from '../../Hooks/CartHook'
import NotFound from '../../Components/NotFound/NotFound'
const FoodPage = () => {
    const {addToCart}=useContext(CartContext)
    const [food, setFood] = useState({})
    const { id } = useParams()
    const navigate=useNavigate()
    const HandleCart=()=>{
        addToCart(food)
        navigate('/cart')
    }
    useEffect(() => {
        getById(id).then(setFood);
      }, [id]);
    return (
        <>
            {!food ?(<NotFound message="Food Not Found" LinkText="Back to HomePage"></NotFound>):
            
           ( <div className='food-container'>
                <img src={`${food.imageUrl}`} className='food-image' alt={food.name} />
                <div className='food-details'>
                    <div className='food-header'>
                        <span className='food-name'>{food.name}</span>
                        <span
                            className={`favorite ${food.favorite ? '' : 'not-favorite'}`}
                        >
                            ❤️
                        </span>

                    </div>
                    <div className='food-rating'>
                        <StarRating stars={food.stars} size={25}/>
                    </div>
                    <div className='food-origins'>
                        {food.origins?.map((origin)=>(<span key={origin}>{origin}</span>))}
                      
                    </div>
                    <div className='food-tags'>
                        {
                            food.tags &&<Tags tags={food.tags.map(tag=>({name:tag}))}
                            forFoodPage={true}/>
                        }
                    </div>
                    <div className='food-cooktime'>
                        <span>
                            Time to cook about <strong>{food.cookTime}</strong>minutes
                        </span>
                    </div>
                    <div className='food-price'>
                        
                        <Price price={food.price}/>
                    </div>
                    <button onClick={HandleCart}> Add to Cart</button>
                </div>
            </div>)
            
            }
        </>
    )
}

export default FoodPage