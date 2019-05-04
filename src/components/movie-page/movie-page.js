import React, {Component} from 'react';
import Spinner from '../spinner';
import { movieLoaded, dataRequested } from '../../actions';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';


import './movie-page.css';

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

        const {movie, imagePath, loading} = this.props;
        const fullPath=`${imagePath}${movie.path}`
        
        if (loading) {
            return <Spinner />
        }

        return (
            <div className="movie-data">
                <img className="movie-image" src={fullPath} alt='movie-poster'></img>  
                <div className="movie-info">
                    <h2 className="movie-title" id={movie.id}>{movie.title}</h2>   
                    <div className="details">               
                        <span>Release date: </span>
                        {movie.release}
                        <span>Movie overview: </span>
                        {movie.overview}                    
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
        loading: state.loading
    }
}

const mapDispatchToProps = {
    movieLoaded,
    dataRequested
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MoviePage));