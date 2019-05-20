import React, {Component} from 'react';
import { itemAddedToCart, itemAddedToCheckout } from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './movie-list-item.css';




class MovieListItem extends Component {
    
 

     render() {
        
        const { movie, imagePath, onAddedToCart, onAddedToCheckout } = this.props;
        const fullPath=`${imagePath}${movie.path}`;
        const price = (Math.random()*10).toFixed(2)
        
        return (
            <div className="movie-list-item">
                <img className="poster" src={fullPath} alt='movie-poster'></img>
                <div className="content">
                    <Link to="/movie">
                        <h2 id={movie.id}>{movie.title}</h2>
                    </Link>

                    <div className="purchasing">
                        <p>Price: ${price}</p>
                        <Link to="/checkout">
                            <button onClick={() => onAddedToCheckout(movie.id)}>Buy Now</button>
                        </Link>                        
                        <button className="toCart" onClick={() => onAddedToCart(movie.id)}>Add to Cart</button>   
                    </div>                    
                </div>    
            </div>
        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddedToCart: (id) => dispatch(itemAddedToCart(id)),
        onAddedToCheckout: (id2) => dispatch(itemAddedToCheckout(id2)),
    }
}

export default connect(null, mapDispatchToProps)(MovieListItem);
