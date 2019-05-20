import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {cartReloaded, itemsAddedToCheckout} from '../../actions';
import './shopping-cart-table.css';

class ShoppingCartTable extends Component {


    renderRow = (movie) => {

        const {imagePath} = this.props;
        const fullPath=`${imagePath}${movie.path}`;
       
        return (
            <div key={movie.id} className="info">
                <span><img className="movie-image" src={fullPath} alt="movie"></img></span>
                <span className="name">{movie.title}</span>
                <span>Qty: {movie.quantity}</span>
                <span>${movie.price}</span>
            </div>
        )
    }

    render() {
        const {cartItems, movie, itemsAddedToCheckout} = this.props;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;     
                
        const totalItems = cartItems.map(({quantity}) => quantity).reduce(reducer); 

        const totalPrice = cartItems.map(({price}) => price).reduce(reducer)


        return (
            <div className="cart">
                <div key={movie.id}>                                    
                    {cartItems.map(this.renderRow)}
                </div>

                <div className="toCheckout">
                    <Link to="/checkout">
                        <button onClick={()=>itemsAddedToCheckout(cartItems)}>Go to checkout</button>
                    </Link>                    
                    <div>Item ({totalItems})</div>
                    <div>Shipping: Free</div>
                    <div>Total: ${totalPrice}</div>
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
        checkoutItems: state.checkoutItems
    }
}

const mapDispatchToProps = {
    cartReloaded,
    itemsAddedToCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);