import React, {Component} from 'react';
import Spinner from '../spinner';
import {PurchaseButtons} from './../movie-list-item';
import { movieLoaded, dataRequested } from '../../actions';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';


import './movie-page.css';
import './../movie-list-item/movie-list-item.css'

class MoviePage extends Component {

    componentDidMount() {
        this.updateMovie()
    }

    updateMovie() {
        const { moviestoreService, movieId, dataRequested } = this.props;

        dataRequested();
        moviestoreService.getItem(movieId)
            .then((movie) => {
                this.props.movieLoaded(movie)
            })           
    }

    render() {

        const {movie, imagePath, loading, defaultPrice} = this.props;
        const fullPath=`${imagePath}${movie.path}`;
     
        
        if (loading) {
            return <Spinner />
        }

        return (
            <div className="movie-data">
                <img className="movie-image" src={fullPath} alt='movie-poster'></img>  

                <div className="movie-info" id={movie.id}>
                    <div className="movie-title">{movie.title}</div>
                    <div className="details">
                        <span className="movie-genre">Movie genre</span>
                        <span className="movie-duration">Runtime {}</span>
                        <span className="movie-release">Release {movie.release}</span>
                    </div>
                    
                    <div className="overview">
                        <span className="overview-name">OVERVIEW</span>
                        <span className="overview-value">{movie.overview}</span>
                    </div>
                    <div className="movie-price">
                        <span className="price-name">PRICE</span>
                        <span className="price-value">${defaultPrice}</span>
                    </div>
                    <div className="quantity">
                        <span className="quantity-name">QUANTITY</span>
                        <div className="quantity-value">
                            <ul>
                                <li><button>-</button></li>
                                <li className="value">1</li>
                                <li><button>+</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="purchase-buttons">
                        <PurchaseButtons />
                    </div>
                </div>
            </div>
        )}
    }

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        imagePath: state.imagePath,
        movieId: state.movieId, 
        movie: state.movie,
        loading: state.loading,
        defaultPrice: state.defaultPrice
    }
}

const mapDispatchToProps = {
    movieLoaded,
    dataRequested
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MoviePage));