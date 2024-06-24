import { Link } from 'react-router-dom'
import classes from './Header.module.css'
// import '../Header/Header.css'
import React, { useContext } from 'react'
import { AuthContext } from '../../Hooks/UseAuthHook'
import { CartContext } from '../../Hooks/CartHook'

const Header = () => {
    const {user,logout}=useContext(AuthContext)
    const {cart}=useContext(CartContext)
  return (
    <header className={classes.header}>
    <div className={classes.container}>
        <div className={classes.logo}>
            <Link to='/' style={{textDecoration:'none'}}>FOOD MINE!</Link>
        </div>
        
            <nav>
                <ul >
                    {
                        user?
                        <li className={classes.menu_container}>
                            <Link to ='/profile' style={{textDecoration:'none'}}>{user.name}</Link>
                            <div className={classes.menu}>
                                <Link to='/profile' style={{textDecoration:'none'}}>Profile</Link>
                                <Link to='/orders' style={{textDecoration:'none'}}> Orders</Link>
                                <a onClick={logout} >Logout</a>
                        </div>

                        </li>
                        :
                        < Link to ='/login' style={{textDecoration:'none'}}>Login</Link>
                    }
                    <li>
                       <Link to='/cart' style={{textDecoration:'none'}} >cart
                       {cart.cartcount>0 && <span className={classes.cart_count}>{cart.cartcount}</span>}
                       </Link> 
                    </li>
                </ul>
            </nav>
            </div>
        
    </header>
     )
}

export default Header