import React from 'react';
import { Link } from 'react-router-dom';
import './shop-header.css';

const ShopHeader = () => {
    return (
        <header>
            <Link to="/">
                <div>
                    <img src="https://image.flaticon.com/icons/svg/1719/1719926.svg" className="logo" width="50px" height="50px" />
                    <h1 className="title">Movies Store</h1>
                </div>
            </Link>
            <Link to="/cart">
                <div>                
                    <img src="https://image.flaticon.com/icons/svg/2/2772.svg" className="shopping-cart-icon" width="32px" height="32px" alt="cart" />
                </div>
            </Link>
        </header>

    )
}

export default ShopHeader;