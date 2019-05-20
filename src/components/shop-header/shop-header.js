import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './shop-header.css';

const ShopHeader = ({cartItems}) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue;                     
    const totalItems = cartItems.map(({quantity}) => quantity).reduce(reducer); 

    return (
        <header>
            <Link to="/">
                <div>
                    <img src="https://image.flaticon.com/icons/svg/1719/1719926.svg" className="logo" width="50px" height="50px" alt="logo" />
                    <h1 className="title">Movies Store</h1>
                </div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">                
                    <img src="https://image.flaticon.com/icons/svg/2/2772.svg" className="shopping-cart-icon" alt="cart" />
                    <div className="counter">{totalItems}</div>
                </div>
            </Link>
        </header>

    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(ShopHeader);