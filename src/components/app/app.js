import React from 'react';
import {HomePage, CartPage, CheckoutPage} from '../pages';
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
        </main>          

            
    )
}

export default withMoviestoreService()(App);
