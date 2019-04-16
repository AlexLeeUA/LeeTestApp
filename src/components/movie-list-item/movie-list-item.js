import React, {Component} from 'react';


import './movie-list-item.css';

class MovieListItem extends Component {
    
 

    render() {
        
        const { movie, imagePath } = this.props;
        const fullPath=`${imagePath}${movie.path}`
        
        return (
            <div className="movie-list-item">
                <img className="poster" src={fullPath} alt='movie-poster'></img>
                <div className="content">
                    <h2>{movie.title}</h2>
                    <div className="details">
                        <span>Release date: </span>
                        {movie.release}
                    </div>
                    <div className="details">
                        <span>Movie overview: </span>
                        {movie.overview}
                    </div>
                    <div className="purchasing">
                        <button>Buy Now</button>
                        <button>Add to Cart</button>   
                    </div>                    
                </div>    
            </div>
        )}
}


export default MovieListItem;
