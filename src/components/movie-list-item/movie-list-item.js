import React, {Component} from 'react';
import { itemAddedToCart, itemAddedToCheckout } from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './movie-list-item.css';


const PurchaseButtons = ({onAddedToCheckout, onAddedToCart, movie}) => {
    return (
        <div className="purchasing">
            <Link to="/checkout">
                <button className="buy-now" onClick={() => onAddedToCheckout(movie.id)}>Buy Now</button>
            </Link>                        
            <button className="add-to-cart" onClick={() => onAddedToCart(movie.id)}>Add to Cart</button>   
        </div>
    )
}

class MovieListItem extends Component {
    
       render() {
        const { movie, imagePath, onAddedToCart, onAddedToCheckout, defaultPrice } = this.props;
        const fullPath=`${imagePath}${movie.path}`;

        return (
            <div className="movie-list-item">
                <img className="poster" src={fullPath} alt='movie-poster'></img>
                <div>
                    <Link to={`/movie/${movie.id}`}>
                        <h2 id={movie.id} className="movie-title">{movie.title.toUpperCase()}</h2>
                    </Link>
                    <div className="content">
                        <span className="movie-popularity">Popularity {movie.popularity}</span>
                        <span className="movie-release">Release {movie.release}</span>
                    </div>
                    <div className="movie-price">
                        <span className="price-name">PRICE</span>
                        <span className="price-value">${defaultPrice}</span>
                    </div>
                    <PurchaseButtons onAddedToCheckout={onAddedToCheckout} onAddedToCart={onAddedToCart} movie={movie} />       
                </div>    
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        defaultPrice: state.defaultPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddedToCart: (id) => dispatch(itemAddedToCart(id)),
        onAddedToCheckout: (id2) => dispatch(itemAddedToCheckout(id2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
export {
    PurchaseButtons
}
