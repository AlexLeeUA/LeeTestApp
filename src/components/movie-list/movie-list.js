import React, { Component } from 'react';
import {withMoviestoreService} from '../hoc';
import MovieListItem from '../movie-list-item';
import { connect } from 'react-redux';
import { moviesLoaded,imagePathLoaded } from '../../actions';

import './movie-list.css';



class MovieList extends Component {
    
    componentDidMount() {
        const { moviestoreService } = this.props;
        moviestoreService.getItemList()
            .then((value) => {
                this.props.moviesLoaded(value);
            })
        moviestoreService.getImagePath()
            .then((path) => {
                this.props.imagePathLoaded(path)
            })
    }


    render() {
        const { movies, imagePath } = this.props;

        return (
            <ul className="movielist">
                {
                    movies.map((movie) => {
                        return (<li key={movie.id}><MovieListItem movie={movie} imagePath={imagePath} /></li>)
                    })
                }
            </ul>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        imagePath: state.imagePath
    }
}

const mapDispatchToProps = {
    moviesLoaded,
    imagePathLoaded
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MovieList));
