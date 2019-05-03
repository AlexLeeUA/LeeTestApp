import React, { Component } from 'react';
import {withMoviestoreService} from '../hoc';
import MovieListItem from '../movie-list-item';
import SearchPanel from '../search-panel';
import ShopFooter from '../shop-footer';
import { connect } from 'react-redux';
import { moviesLoaded, imagePathLoaded, movieIdGot, loading } from '../../actions';

import './movie-list.css';



class MovieList extends Component {
       
    componentDidMount() {
        this.updateList()
    }


    componentDidUpdate(prevProps) {
        if (this.props.movieListId !== prevProps.movieListId) {
            this.updateList()
        }
        if (this.props.searchReq.length !== prevProps.searchReq.length) {
            this.search()
        }
}


    search() {
        const { movies, searchReq, moviesLoaded } = this.props
        
        if (searchReq.length === 0) {
            this.updateList()
        } 
      
        else {
            return moviesLoaded(movies.filter((movie) => {
                return movie.title.toLowerCase().indexOf(searchReq.toLowerCase()) > -1;
            }))
        }            
    }

    updateList() {
        const { moviestoreService, movieListId } = this.props;

        if (movieListId>0) {
            moviestoreService.getItemList(movieListId)
            .then((value) => {
                this.props.moviesLoaded(value);
            })
            moviestoreService.getImagePath()
            .then((path) => {
                this.props.imagePathLoaded(path);
            })
        }       
        
    }


    render() {
        const { movies, imagePath, movieIdGot } = this.props;  
      
        return (
            <div>
                <SearchPanel />
                <ul className="movielist" onClick={(e) => {return movieIdGot(e.target.id)}}>
                    {
                        movies.map((movie) => {
                            return (<li key={movie.id}><MovieListItem movie={movie} imagePath={imagePath}  /></li>)
                        })
                    }
                </ul>
                <ShopFooter />
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        imagePath: state.imagePath,
        movieListId: state.movieListId,
        searchReq: state.searchReq,
        movieId: state.movieId,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    moviesLoaded,
    imagePathLoaded,
    movieIdGot,
    loading
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MovieList));
