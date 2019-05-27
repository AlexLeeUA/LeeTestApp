import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {cartReloaded, itemAddedToCart, itemsAddedToCheckout, itemDeletedFromCart, itemRemovedFromCart} from '../../actions';

import './shopping-cart-table.css';


const dashBoard = ({cartItems}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;            
    const totalPrice = cartItems.map(({price}) => price).reduce(reducer)
    
        return (
            <tbody>
                <tr>
                    <td className="sub-total">Sub-total:</td>
                    <td style={{textAlign: 'right'}} className="sub-total-price">${totalPrice}</td>
                </tr>
                <tr>
                    <td className="shipping">Shipping:</td>
                    <td style={{textAlign: 'right'}} className="shipping-value">Free</td>
                </tr>
                <tr>
                    <td className="grand-total">Grand Total:</td>
                    <td style={{textAlign: 'right'}} className="grand-total-value">${totalPrice}</td>
                </tr>
            </tbody>
        )
}

const quantityButtons = ({movie, itemRemovedFromCart, itemAddedToCart}) => {
    return (
        <ul className="quantity-value">
            <li><button onClick={()=>itemRemovedFromCart(movie.id)}>-</button></li>
            <li className="value">{movie.quantity}</li>
            <li><button onClick={()=>itemAddedToCart(movie.id)}>+</button></li>
        </ul>
    )      
}

class ShoppingCartTable extends Component {

    renderRow = (movie) => {

        const {imagePath, cartItems, itemAddedToCart, itemRemovedFromCart, itemDeletedFromCart} = this.props;
        const fullPath=`${imagePath}${movie.path}`;
        const index = cartItems.findIndex(({id}) => id === movie.id);
       
        return (
            <div key={movie.id}>
                <ul className="general-info">
                    <li><button className="remove-item" onClick={()=>itemDeletedFromCart(index)} /></li>
                    <li><img className="movie-image" src={fullPath} alt="movie" /></li>
                    <li>
                        <div className="movie-title">{movie.title.toUpperCase()}</div>
                        <div className="quantity">
                            <span className="quantity-name">QUANTITY</span>
                            <div>
                               {quantityButtons({movie, itemRemovedFromCart, itemAddedToCart})}
                            </div>
                        </div>
                    </li>
                    <li className="price-value">${movie.price}</li>
                </ul>
            </div>
        )
    }

    render() {
        const {cartItems, movie, itemsAddedToCheckout} = this.props;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;      
        const totalItems = cartItems.map((item) => item.quantity).reduce(reducer); 
        console.log(cartItems)

        return (
            <div className="cart">
                <div className="title">My Cart</div>
                <div key={movie.id}>                                    
                    {cartItems.map(this.renderRow)}
                </div>

                <div className="purchase-items">
                    <table className="checkout-table">
                        <thead>
                            <tr>
                                <td className="order">Your Order</td>
                                <td><span className="items">{totalItems} Items</span></td>
                            </tr>
                        </thead>
                        {dashBoard({cartItems})}
                    </table>
                    <Link to="/checkout">
                        <button className="checkout-button" onClick={()=>itemsAddedToCheckout(cartItems)}>Go to checkout</button>
                    </Link>          
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        imagePath: state.imagePath,
        movieId: state.movieId,
        movie: state.movie,
        cartItems: state.cartItems,
        checkoutItems: state.checkoutItems,
        defaultPrice: state.defaultPrice
    }
}

const mapDispatchToProps = {
    cartReloaded,
    itemAddedToCart,
    itemsAddedToCheckout,
    itemRemovedFromCart,
    itemDeletedFromCart
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);