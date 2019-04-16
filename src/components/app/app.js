import React from 'react';
import MovieList from '../movie-list';
import {withMoviestoreService} from '../hoc';


const App = () => {
    
        
    return (
        <MovieList />
    )
}

export default withMoviestoreService()(App);
