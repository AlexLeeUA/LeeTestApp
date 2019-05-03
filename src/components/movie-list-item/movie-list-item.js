import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import './movie-list-item.css';




class MovieListItem extends Component {
    
    

     render() {
        
        const { movie, imagePath } = this.props;
        const fullPath=`${imagePath}${movie.path}`
        
        return (
            <div className="movie-list-item">
                <img className="poster" src={fullPath} alt='movie-poster'></img>
                <div className="content">
                    <Link to="/movie">
                        <h2 id={movie.id}>{movie.title}</h2>
                    </Link>

                    <div className="details">
                        <span>Release date: </span>
                        {movie.release}
                    </div>

                    <div className="details">
                        <span>Movie overview: </span>
                        {movie.overview}
                    </div>

                    <div className="purchasing">
                        <p>Price: ${(Math.random()*10).toFixed(2)}</p>
                        <Link to="/checkout">
                            <button>Buy Now</button>
                        </Link>                        
                        <button className="toCart">Add to Cart</button>   
                    </div>                    
                </div>    
            </div>
        )}
}


export default MovieListItem;
