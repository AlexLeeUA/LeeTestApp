import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {defaultListLoaded} from '../../actions';
import './shop-header.css';
import logo from '../../styles-and-fonts/images/logo.svg';
import cart from '../../styles-and-fonts/images/cart.svg';


const ShopHeader = ({cartItems, movieListId, defaultListLoaded}) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue;                     
    const totalItems = cartItems.map(({quantity}) => quantity).reduce(reducer); 
    console.log(movieListId)
    return (
        <header>
            <Link to={`/home`}>
                <div className="header-title" onClick={()=>defaultListLoaded(movieListId)}>
                    <img src={logo} className="logo" alt="logo" />
                    <h1 className="name">Movies Store</h1>
                </div>
            </Link>

            
            <Link to="/cart">
                <div className="shopping-cart">                
                    <img src={cart} className="shopping-cart-icon" alt="cart" />
                    <div className="counter"><span className="total">{totalItems}</span></div>
                </div>
            </Link>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    }
}

const mapDispatchToProps = {
        defaultListLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);