import React, {Component} from 'react';
import { movieLoaded } from '../../actions';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';


import './movie-page.css';

class MoviePage extends Component {

    componentDidMount() {
        this.updateMovie()
    }

    updateMovie() {
        const { moviestoreService, movieId } = this.props;

        moviestoreService.getItem(movieId)
            .then((movie) => {
                this.props.movieLoaded(movie)
            })
            
    }

    render() {

        const {movie, imagePath} = this.props;
        const fullPath=`${imagePath}${movie.path}`
        
        return (
            <div>
                <img className src={fullPath} alt='movie-poster'></img>              
                <h2 id={movie.id}>{movie.title}</h2>                    

                <div className="details">
                    <span>Release date: </span>
                    {movie.release}
                </div>

                <div className="details">
                    <span>Movie overview: </span>
                    {movie.overview}
                </div>
            </div>
        )}
    }

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        imagePath: state.imagePath,
        movieId: state.movieId, 
        movie: state.movie
    }
}

const mapDispatchToProps = {
    movieLoaded
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MoviePage));