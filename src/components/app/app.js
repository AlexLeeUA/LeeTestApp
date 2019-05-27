import React from 'react';
import HomePage, {CartPage, CheckoutPage} from '../pages';
import MoviePage from '../movie-page/';
import MovieList from '../movie-list';
import {Route} from 'react-router-dom';
import ShopHeader from '../shop-header';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';


const App = (movieListId) => {

    return (
        
        <main>
            <ShopHeader movieListId={movieListId}/>
            <Route path="/movielist/1" component={HomePage} exact />
            <Route path="/movielist/:id/" render={({match}) => {
                                                const {id} = match.params;
                                                return <MovieList movieListId={id} />}} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/movie/:id" render = {({match}) => {
                                                const {id} = match.params;
                                                return <MoviePage movieId={id} />}} />
        </main>                    
    )
}

const MapStateToProps = (state) => {
    return {
        movieListId: state.movieListId
    }
}

export default withMoviestoreService()(connect(MapStateToProps)(App));
