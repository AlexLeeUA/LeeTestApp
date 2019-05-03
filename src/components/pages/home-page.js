import React from 'react';
import MovieList from '../movie-list';

const HomePage = ({movieListId}) => {
    return <MovieList movieListId={movieListId} />
}


export {
    HomePage
}