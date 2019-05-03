import React from 'react';
import {HomePage, CartPage, CheckoutPage} from '../pages';
import MoviePage from '../movie-page';
import {Route} from 'react-router-dom';
import ShopHeader from '../shop-header';
import {withMoviestoreService} from '../hoc';


const App = () => {
        
    return (
        <main>
            <ShopHeader />
            <Route path="/" component={HomePage} exact />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/movie" component={MoviePage} />
        </main>          

            
    )
}

export default withMoviestoreService()(App);
